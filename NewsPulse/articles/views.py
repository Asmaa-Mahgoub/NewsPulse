from django.shortcuts import render
from rest_framework import generics, permissions
from .models import CustomUser, Article
from .serializers import CustomUserSerializer,PasswordChangeSerializer, ProfileSerializer, ArticleSerializer, PasswordResetRequestSerializer

# for user logout 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.exceptions import PermissionDenied
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
#for login

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# To filter articles by the logged-in user and optionally by a search term
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


# Create your views here.

""" class SignUpView(generics.CreateAPIView):
    queryset= CustomUser.objects.all()
    serializer_class=CustomUserSerializer
    permission_classes = [AllowAny]
 """

#Login view
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        selected_role = request.data.get("role")

        user = authenticate(username=username, password=password)

        if user is not None:
            # Check if selected role matches actual role
            if user.role != selected_role:
                return Response({"error": "Role mismatch. Please select correct role."},
                                status=status.HTTP_403_FORBIDDEN)
        # Get or create token
            token, _ = Token.objects.get_or_create(user=user)

            # Decide redirect URL based on role
            if user.role == "Admin":  
                redirect_url = "/admin/dashboard/"
            elif user.role == "author":
                redirect_url = f"/profile/{user.id}/"
            else:
                redirect_url = "/"

            return Response({
                "token": token.key,
                "role": user.role,
                "redirect_url": redirect_url,
                "message": "Login successful"
            }, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
#logout view
class LogOutView(APIView):
    permission_classes= [IsAuthenticated]
   
    def post(self, request): #POST is used because logout changes the state (removes the token), unlike GET which just retrieves data.
        request.user.auth_token.delete()  # delete the token from DB
        return Response({"message":"Logout done successsfully"},status=status.HTTP_200_OK)


"""  This line ensures that only logged-in users (who have a valid authentication token)can access this endpoint.
    If someone who is not authenticated tries to call this endpoint → they get a 401 Unauthorized response 
    automatically. """

#account password change
class PasswordChangeView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    
# List + Create
class ArticleListCreateView(generics.ListCreateAPIView): #GET /articles/ → list all articles.POST /articles/ → create a new article.
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]  # enable search
    search_fields = ['author__email', 'author__username', 'title']  # searchable fields

    def get_queryset(self): #overrides the default queryset for the view.
        user = self.request.user
        queryset = Article.objects.all().order_by('-published_date')

        # Only filter by author if the user is authenticated
        if user.is_authenticated:
            # Optional: If you want authors to only see their own articles:
            queryset = queryset.filter(author=user)

            # Optional: if search query parameter 'search' exists, DRF SearchFilter will handle it
        else:
            # unauthenticated users only see public articles if needed
            queryset = queryset.none()
        return queryset

    def perform_create(self, serializer):
        # Automatically set the logged-in user as author
        serializer.save(author=self.request.user)

""" This queryset is what the view will use when:
Handling a GET request → it retrieves the list of articles (for ListAPIView).
Handling a POST request → it knows which model/table (Article) new objects should be added to.

So:queryset = "This view deals with the collection of Article objects from the database. 
Step by step:

perform_create is called automatically by DRF when a POST request is successful.
The serializer already contains the validated data from the request body (like title, content).
Instead of just saving with that data, you add extra fields.
serializer.save(author=self.request.user) → this means:

Take the validated data.
Add author=self.request.user (the currently logged-in user).
Save it to the database.
Result → the Article object is saved with the correct author field, even though the client didn’t send it in the JSON.

"""

# Retrieve single + Update + Delete
class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        # Only allow author to update
        if self.get_object().author != self.request.user:
            raise PermissionDenied("You can only edit your own articles.")
        serializer.save()


    def perform_destroy(self, instance):
        # Only allow author to delete
        if instance.author != self.request.user:
            raise PermissionDenied("You can only delete your own articles.")
        instance.delete()


""" This one automatically gives:

GET /articles/<pk>/ → retrieve a single article.
PUT /articles/<pk>/ → update an article.
PATCH /articles/<pk>/ → partial update.
DELETE /articles/<pk>/ → delete an article """

#Retrieve not overridden → because everyone can read articles
""" In RetrieveUpdateDestroyAPIView (and other generic DRF views), self.get_object() is a built-in method.
It retrieves the model instance that matches the URL parameter (pk) of the current request.
Example: If the URL is /api/articles/5/, then self.get_object() will fetch the article with id=5.
So here, self.get_object() → gives the Article object that is being retrieved/updated/deleted. """

class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.save()
            # Normally you'd send email here using send_mail
            return Response({"message": "Password reset link generated", "data": data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request, uid, token):
        new_password = request.data.get("new_password")

        if not new_password:
            return Response({"error": "New password is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode UID
            user_id = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({"error": "Invalid UID"}, status=status.HTTP_400_BAD_REQUEST)

        # Check token validity
        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
from django.shortcuts import render
from rest_framework import generics, permissions
from .models import CustomUser, Article
from .serializers import CustomUserSerializer,PasswordChangeSerializer, ProfileSerializer, ArticleSerializer
# for user logout 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.exceptions import PermissionDenied

# Create your views here.

class SignUpView(generics.CreateAPIView):
    queryset= CustomUser.objects.all()
    serializer_class=CustomUserSerializer
    permission_classes = [AllowAny]

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
    queryset = Article.objects.all().order_by('-published_date')
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
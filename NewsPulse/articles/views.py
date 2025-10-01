from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializers import CustomUserSerializer,PasswordChangeSerializer, ProfileSerializer
# for user logout 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
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
    


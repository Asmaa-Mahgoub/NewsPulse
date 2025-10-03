from .serializers import ProfileSerializer 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ProfileDetailView(APIView):  #Show me my profile
    permission_classes = [IsAuthenticated] #Any request hitting this view must be from a logged-in user.If not, DRF returns 401 Unauthorized.

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProfileUpdateView(APIView):  #Edit my profile
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True) #partial=True → Allows updating only some fields (not all required).
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

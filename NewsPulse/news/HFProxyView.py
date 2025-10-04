""" import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class HFProxyView(APIView):
    permission_classes = [IsAuthenticated]  # only logged-in users can call

    def post(self, request):
        user_input = request.data.get("inputs")
        if not user_input:
            return Response({"error": "No input provided"}, status=status.HTTP_400_BAD_REQUEST)

        headers = {"Authorization": f"Bearer {settings.HF_API_KEY}"}
        url = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill"

        try:
            resp = requests.post(url, headers=headers, json={"inputs": user_input}, timeout=20)
            resp.raise_for_status()  # raise error if status != 200
            return Response(resp.json(), status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)


 """
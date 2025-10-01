from django.urls import path
from .views import SignUpView, LogOutView
from rest_framework.authtoken.views import obtain_auth_token
from .views import PasswordChangeView


""" Django REST Framework (DRF) provides a ready-made login endpoint called obtain_auth_token.
Its job: take a username + password from the request → validate → return an authentication token if correct.
This token is then used in headers (Authorization: Token abc123...) so that future API requests know who t
he user is. """

""" Token is sent from the client (frontend, Postman, mobile app, etc.) inside the request headers.
Frontend apps usually automate this by saving the token once and attaching it on every request """

urlpatterns=[
    path('signup/',SignUpView.as_view(), name='signup'),
    path('login/', obtain_auth_token, name="login"),
    path('logout/',LogOutView.as_view(), name="logout"),
    path('password-change/', PasswordChangeView.as_view(), name='password_change')
]
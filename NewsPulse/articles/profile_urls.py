from django.urls import path
from .profile_views import ProfileDetailView, ProfileUpdateView

urlpatterns = [
    path('view/', ProfileDetailView.as_view(), name='profile-detail'),
    path('update/', ProfileUpdateView.as_view(), name='profile-update'),
]


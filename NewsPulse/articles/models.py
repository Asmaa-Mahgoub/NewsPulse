from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):

    email=models.EmailField(unique=True)
    role=models.CharField(max_length=50, choices=[('author','Author'), ('admin','Admin')], default='author')
    bio=models.TextField(blank=True, null=True)
    profile_picture=models.ImageField(upload_to='profiles/', blank=True, null=True)

   
    def __str__(self):
        return self.email
    
""" If a user selects “Author” in the admin panel → Django will save "author" in the database.
But in the Django Admin or a form dropdown, the user will see “Author”. 

AbstractUser supports Full Django authentication system.It works with login, logout, authenticate,
UserCreationForm, etc. Built-in password hashing + Works with IsAuthenticated, IsAdminUser,
IsAuthenticatedOrReadOnly. It Works with Django’s permission system (user.has_perm('delete_article')) & 
Fields like is_active, is_staff, is_superuser.

AbstractUser already has:
username, email, password, first_name, last_name, etc.
I only extended it with role.
"""


class Article(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    category=models.CharField(max_length=100)
    title=models.CharField(max_length=200)
    content=models.TextField()
    published_date=models.DateTimeField(auto_now_add=True) 
    author=models.ForeignKey(CustomUser,related_name="articles",on_delete=models.CASCADE)
    tags = models.CharField(max_length=200, blank=True, null=True)
    views_count =models.PositiveIntegerField(default=0)
    file = models.FileField(upload_to='media/', blank=True, null=True)
    media_type = models.CharField(
        max_length=10, 
        choices=MEDIA_TYPES,    
        blank=True, 
        null=True
    )

    def __str__(self):
        return f"{self.title} by {self.author}"
    
    """ auto_now_add=True, tells Django: “when the record is first created, automatically set this field 
    to the current date and time. While auto_now=True = update every save. """


from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    user_name=models.CharField(max_length=100)
    email=models.EmailField(max_length=100, unique=True)
    password=models.CharField(max_length=100)
    role=models.CharField(max_length=50, choices=[('author','Author'), ('editor','Editor')], default='author')
    def __str__(self):
        return self.user_name
""" If a user selects “Author” in the admin panel → Django will save "author" in the database.
But in the Django Admin or a form dropdown, the user will see “Author”. 

AbstractUser supports Full Django authentication system.It works with login, logout, authenticate,
UserCreationForm, etc. Built-in password hashing + Works with IsAuthenticated, IsAdminUser,
IsAuthenticatedOrReadOnly. It Works with Django’s permission system (user.has_perm('delete_article')) & 
Fields like is_active, is_staff, is_superuser.

"""
    


class Article(models.Model):
    category=models.CharField(max_length=100)
    title=models.CharField(max_length=200)
    content=models.TextField()
    published_date=models.DateTimeField(auto_now_add=True) 
    author=models.ForeignKey(CustomUser,related_name="articles",on_delete=models.CASCADE )
    views_count =models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} by {self.author}"
    """ auto_now_add=True, tells Django: “when the record is first created, automatically set this field 
    to the current date and time. While auto_now=True = update every save. """


class Media(models.Model):
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]

    article = models.ForeignKey(Article, related_name='media', on_delete=models.CASCADE)
    file = models.FileField(upload_to='media/')
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)

    def __str__(self):
        return f"{self.media_type} for {self.article.title}"
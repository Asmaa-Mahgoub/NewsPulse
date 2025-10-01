from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

""" Importing our own custom user model (instead of Django’s default User) to ensures that 
the form will be tied to the project’s user model, which might have extra fields like role. """

class CustomUserCreationForm(UserCreationForm):
    email=forms.EmailField(unique=True)      #Explicitly adds an email field to the form.

    class Meta:          #Tells Django which model this form is tied to and which fields to show.
        model=CustomUser #The form saves data into your CustomUser table instead of Django’s default User table.
        fields=('username', 'email', 'password1', 'password2', 'role')

""" UserCreationForm already includes:
username
password1 (password field with validation)
password2 (confirmation password field) """
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser
from random import choice
from string import *

class CustomUserCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs): 
        super(CustomUserCreationForm, self).__init__(*args, **kwargs) 
        # remove username
        self.fields.pop('username')
        
        for fieldname in ['password1', 'password2']:
            self.fields[fieldname].help_text = None

    def save(self, request):
        # Generates a random username for the users, since we don't care about username.
        random = ''.join([choice(ascii_letters) for i in range(30)])
        self.instance.username = random
        return super(CustomUserCreationForm, self).save()

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name',)

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name',)
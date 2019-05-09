from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('', views.home, name='blog-home'),
    path('upload/', views.upload, name='upload'),
]

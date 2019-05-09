from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request, 'blog/index.html')

def info(request):
    return render(request, 'blog/info.html')

def kontakt(request):
    return render(request, 'blog/kontakt.html')

def sokjobb(request):
    return render(request, 'blog/sokjobb.html')

def profil(request):
    return render(request, 'blog/profil.html')

def upload(request):
    return render(request, 'upload.html')

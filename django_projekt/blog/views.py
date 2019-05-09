from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request, 'blog/index.html')

def home(request):
    return render(request, 'blog/info.html')

def home(request):
    return render(request, 'blog/kontakt.html')

def home(request):
    return render(request, 'blog/sokjobb.html')

def home(request):
    return render(request, 'blog/index.html')

def upload(request):
    return render(request, 'upload.html')

from django.urls import path
from django.conf.urls import url
from . import views
from django.contrib import admin

urlpatterns = [
    url(r'^$', views.home, name='blog-home'),
    url(r'^upload/$', views.upload, name='upload'),
    url(r'^info/$', views.info, name='info'),
    url(r'^kontakt/$', views.kontakt, name='kontakt'),
    url(r'^profil/$', views.profil, name='profil'),
    url(r'^sokjobb/$', views.sokjobb, name='sokjobb'),
]

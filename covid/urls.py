"""covid URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from main.views import home_view,update_view, registration_view, login_view, post_view, CustomLoginView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/',home_view, name='home'),
    path('',home_view, name='home'),
    path('register/', registration_view, name='register'),
    path('login/', login_view, name='login'),
    path('posts/', post_view, name='posts'),
    path('api/login/',CustomLoginView.as_view(), name='home'),
    url(r'^update/', update_view),
    path('accounts/', include('allauth.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    url(r'^registration/', include('dj_rest_auth.registration.urls')),
]


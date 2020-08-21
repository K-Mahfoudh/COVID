
from django.shortcuts import render, redirect
from rest_framework import status
from datetime import datetime
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenVerifySerializer, TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from covid import settings
from main import update_data
from dj_rest_auth.views import LoginView
from django.http import HttpResponseRedirect



import json



# Create your views here.

def home_view(request):
    context = {
    }
    return render(request, 'home.html', context)



def registration_view(request):
    context = {}
    return render(request, 'registration/register.html', context)


def login_view(request):
    context = {
    }
    return render(request, 'login/login.html', context)


def post_view(request):
    verify = TokenVerifySerializer()
    # Access token exists
    if 'token-cookie' in request.COOKIES.keys():
        # Getting access token from cookies
        access_token = request.COOKIES['token-cookie']

        try:
            # Checking if access token is valid
            validation = verify.validate({'token' : access_token})
            if validation == {}:
                context = {

                }
                return render(request, 'posts/posts.html', context)
        except:
            return redirect('/login/')

    # Access cookie isn't available (Access token has expired)
    elif 'ref' in request.COOKIES.keys():
        try:
            #geeting refresh token
            refresh_token = request.COOKIES['ref']

            # checking refresh token validity
            validation = verify.validate({'token': refresh_token})
            if validation == {}:
                token_refresh = TokenRefreshSerializer()
                new_access_token = token_refresh.validate({'refresh': refresh_token})
                response = HttpResponseRedirect('/posts/', status=status.HTTP_200_OK)
                create_cookie(response, new_access_token, 'ACCESS')

                return response

        except:
            return redirect('/login/')

    # Both access and refresh tokens have expired, or user isn't logged in
    else:
        return redirect('/login/')








@api_view(['GET'])
def update_view(request):
    return JsonResponse(update_data.main())


## Modifying login view in order to store refresh token with

class CustomLoginView(LoginView):

    def get_response(self):
        serializer_class = self.get_response_serializer()

        if getattr(settings, 'REST_USE_JWT', False):
            data = {
                'user': self.user,
                'access_token': self.access_token,
                'refresh_token': self.refresh_token
            }
            serializer = serializer_class(instance=data,
                                          context=self.get_serializer_context())
        else:
            serializer = serializer_class(instance=self.token,
                                          context=self.get_serializer_context())

        response = Response(serializer.data, status=status.HTTP_200_OK)
        create_cookie(response, self.access_token, 'ACCESS')
        create_cookie(response, self.refresh_token, 'REFRESH')
        return response


def create_cookie(response, token, cookie_type):
    if getattr(settings, 'REST_USE_JWT', False):
        cookie_name = getattr(settings, 'JWT_AUTH_COOKIE', None) if cookie_type == 'ACCESS' else getattr(settings, 'JWT_REFRESH_COOKIE', None)
        cookie_secure = getattr(settings, 'JWT_AUTH_SECURE', False)
        cookie_httponly = getattr(settings, 'JWT_AUTH_HTTPONLY', True)
        cookie_samesite = getattr(settings, 'JWT_AUTH_SAMESITE', 'Lax')

        if cookie_name:
            expiration = (datetime.utcnow() + jwt_settings.ACCESS_TOKEN_LIFETIME) if cookie_type == 'ACCESS' else (datetime.utcnow() + jwt_settings.REFRESH_TOKEN_LIFETIME)
            response.set_cookie(
                cookie_name,
                token,
                expires=expiration,
                secure=cookie_secure,
                httponly=cookie_httponly,
                samesite=cookie_samesite
            )
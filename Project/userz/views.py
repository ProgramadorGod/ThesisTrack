from django.shortcuts import render
from django.http import HttpResponseRedirect
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from .models import Account
from .serializers import AccountSerializer
from rest_framework.response import Response

class AccountListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        print(request.user)
        user =  request.user

    
        return Response({
            "ID":user.id,
            "Username":user.username,
            "UserType":user.UserType.UserType
        
    })


Port = "httt://127.0.0.1:3000/"

def home(request):
    return HttpResponseRedirect(Port)

def logout(request):
    logout(request)
    return HttpResponseRedirect(Port)
    

# =============================================================================


from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


from django.shortcuts import redirect
from allauth.account.views import LogoutView as AllauthLogoutView
from allauth.account.views import LoginView as AllauthLoginView


class CustomLogoutView(AllauthLogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)



class CustomLoginView(AllauthLoginView):
    def form_valid(self, form):
        return redirect('accounts/google/login/continue')  # Cambia 'google_login' según la URL de inicio de sesión de Google en tus URLs

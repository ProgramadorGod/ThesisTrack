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
            "UserType":user.UserType.UserType,
            "UserMail":user.email,
        
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
from django.contrib.auth import authenticate,login
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny



class CustomLogoutView(AllauthLogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)



class CustomLoginView(AllauthLoginView):
    def form_valid(self, form):
        
        return redirect('accounts/google/login/continue')  # Cambia 'google_login' según la URL de inicio de sesión de Google en tus URLs




class OwnLoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

    def post(self,request, *args, **kwargs ):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)


        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = Account.objects.get(username=username)
        except Account.DoesNotExist:
            return Response({'Detail': 'Invalid Username'}, status=status.HTTP_401_UNAUTHORIZED)



        user = authenticate(request, username=username , password=password)

        if user is not None:
            login(request,user)


            return Response({
                'Detail':'Logged Successfully...'
            })
        
        return Response({'Detail':'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)
    




from django.http import JsonResponse
from django.middleware.csrf import get_token

def refresh_csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})
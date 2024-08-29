from django.http import HttpResponseRedirect
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.account.views import LogoutView as AllauthLogoutView
from allauth.account.views import LoginView as AllauthLoginView
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import LoginSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import redirect
from ..models import Account

Port = "http://127.0.0.1:3000/"

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class CustomLogoutView(AllauthLogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)

class CustomLoginView(AllauthLoginView):
    def form_valid(self, form):
        return redirect('accounts/google/login/continue')  # Cambia 'google_login' según la URL de inicio de sesión de Google en tus URLs

class OwnLoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = Account.objects.get(username=username)
        except Account.DoesNotExist:
            return Response({'Detail': 'Invalid Username'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({
                'Detail': 'Logged Successfully...'
            })
        
        return Response({'Detail': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)

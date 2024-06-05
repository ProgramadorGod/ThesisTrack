# Uniproyects/users/views.py

from django.shortcuts import render,redirect
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseRedirect
from allauth.account.views import LoginView as AllauthLoginView
from allauth.socialaccount.models import SocialAccount
from .signals import save_profile
from .models import Profile

# Create your views here.
def home(request):
    return HttpResponseRedirect("http://127.0.0.1:3000")
    # return render(request,"home.html")


def logout(request):
    logout(request)
    return HttpResponseRedirect("http://127.0.0.1:3000")

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # save_profile(request, user, user)
        try:
            profile = Profile.objects.get(user=user)
            careers = profile.Carrer.all()
            career_names = [career.name for career in careers]

        except:
            print("not profile")
            career_names = None
        


        # social_account = SocialAccount.objects.filter(user=user, provider='google').first()
        # gender = None
        
        # if social_account:
            # extra_data = social_account.extra_data
            # gender = extra_data.get('gender',None)

        print(user)
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'is_staff?': user.is_staff,
            'last_name':user.last_name,
            'last login':user.last_login,
            'gender':"Aliencontripleriata",
            'careers':career_names,
            
            # Agrega más campos según tus necesidades
        })


#==========================================================================

# views.py
from django.shortcuts import redirect
from allauth.account.views import LogoutView as AllauthLogoutView

class CustomLogoutView(AllauthLogoutView):
    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)



class CustomLoginView(AllauthLoginView):
    def form_valid(self, form):
        return redirect('accounts/google/login/continue')  # Cambia 'google_login' según la URL de inicio de sesión de Google en tus URLs


#==========================================================================



from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter



#==========================================================================

from django.contrib import messages

def change_username(request):
    if request.method == "POST":
        new_username = request.POST.get('username')
        if new_username:
            request.user.username = new_username
            request.user.save()
            messages.success(request,"Username updated successfully")
            return redirect("/")
        
    return render(request,"changeuser.html")



#==========================================================================

from .serializers import UpdateUsernameSerializer
from rest_framework import generics, permissions
from rest_framework import status
from django.contrib.auth.models import User



class UpdateUsernameView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateUsernameSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
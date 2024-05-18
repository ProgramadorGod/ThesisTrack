from django.shortcuts import render
from django.contrib.auth import logout
# from rest_framework.views import APIView
import rest_framework, rest_framework_simplejwt
# from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from allauth.account.views import LoginView as AllauthLoginView

from django.http import HttpResponseRedirect
# Create your views here.
def home(request):
    return(render(request, "home.html"))


def logout(request):
    logout(request)
    return(request)


# class UserProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         print(user)
#         return Response({
#             'id': user.id,
#             'email': user.email,
#             'username': user.username,
#             'is_staff?': user.is_staff,
#             'last_name':user.last_name,
#             'last login':user.last_login,
            
#             # Agrega más campos según tus necesidades
#         })

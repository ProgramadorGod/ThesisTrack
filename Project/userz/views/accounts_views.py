from django.conf import settings
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from ..models import Account
from ..serializers import AccountSerializer
from rest_framework.response import Response

class AccountListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_picture_url = (
            request.build_absolute_uri(user.profile_picture.url)
            if user.profile_picture
            else request.build_absolute_uri(settings.MEDIA_URL + "profile_pictures/einstein.jpeg")
        )

        user_type = "Administrador" if user.is_superuser else "Personal De Control" if user.is_staff else "Normal"

        return Response({
            "ID": user.id,
            "Username": user.username,
            "UserType": user.UserType.UserType,
            "UserMail": user.email,
            "ProfilePicture": profile_picture_url,
            "Role": user_type,  # Agregado: Rol del usuario
        })

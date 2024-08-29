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
        return Response({
            "ID": user.id,
            "Username": user.username,
            "UserType": user.UserType.UserType,
            "UserMail": user.email,
        })

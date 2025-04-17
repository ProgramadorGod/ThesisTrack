from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import AccountSerializer

class AccountListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        serializer = AccountSerializer(user, context={'request': request})
        
        data = serializer.data

        # Agregar campo Role al diccionario
        data["Role"] = (
            "Administrador" if user.is_superuser else
            "Personal De Control" if user.is_staff else
            "Normal"
        )

        return Response(data)

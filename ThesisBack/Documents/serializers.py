from rest_framework import serializers
from .models import Document,DocumentType
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class DocTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ["id", "name", "description"]

class DocumentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    doc_type = DocTypeSerializer()
    class Meta:
        model = Document
        fields = ["id", "user", "title", "filee", "uploaded_at", "description","doc_type"]
        read_only_fields = ["user", "uploaded_at"]
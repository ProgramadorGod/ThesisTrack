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
    users = UserSerializer(many=True)
    doc_type = DocTypeSerializer()
    class Meta:
        model = Document
        fields = ["id", "users", "title", "filee", "uploaded_at", "description","doc_type"]
        read_only_fields = ["users", "uploaded_at"]




class UserUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]

class Doc_typeUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ["id"]


class DocumentUploadSerializer(serializers.ModelSerializer):
    users = User
    doc_type = DocumentType

    class Meta:
        model = Document
        fields = ["id", "users", "title", "filee", "uploaded_at", "description","doc_type"]
        read_only_fields = ["uploaded_at"]
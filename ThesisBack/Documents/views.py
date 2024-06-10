from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.parsers import MultiPartParser,FormParser
from .models import Document, User,DocumentType
from .serializers import DocumentSerializer, DocTypeSerializer,UserSerializer,DocumentUploadSerializer

# Create your views here.


class DocumentUploadView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentUploadSerializer
    




class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.all()
    

class DocumentTypeListView(generics.ListAPIView):
    queryset = DocumentType.objects.all()
    serializer_class = DocTypeSerializer
    
    
class UsernamesListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()
from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.parsers import MultiPartParser,FormParser
from .models import Document, User,DocumentType
from .serializers import DocumentSerializer, DocTypeSerializer

# Create your views here.


class DocumentUploadView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_anonymous:
            user = User.objects.get(username="root")
        serializer.save(user=self.request.user)


class DocumentListView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.all()
    

class DocumentTypeListView(generics.ListAPIView):
    queryset = DocumentType.objects.all()
    serializer_class = DocTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
from django.shortcuts import render
from rest_framework import viewsets
from .models import Document, DocumentStage, DocumentType,Carrer
from .serializers import DocumentSerializer, DocumentStageSerializer, DocumentTypeSerializer,CarrerSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]


class CarrerViewSet(viewsets.ModelViewSet):
    queryset = Carrer.objects.all()
    serializer_class = CarrerSerializer

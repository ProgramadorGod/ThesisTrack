import base64
import uuid
import hashlib

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.files.base import ContentFile
from django.db.models import Q
from .models import UrlDocument, DocumentStage, DocumentType, Carrer, FileDocument
from .serializers import DocumentSerializer, DocumentStageSerializer, DocumentTypeSerializer,FileDocumentSerializer, CarrerSerializer, CreateFileDocSerializer

# Clase de paginación
class DocumentPagination(PageNumberPagination):
    page_size = 30

# Vista personalizada para paginación, búsqueda y filtrado
@api_view(["GET"])
def document_list(request):
    query = request.GET.get('query', '')
    sort_by = request.GET.get('sort_by', 'title')  # Ordenar por título por defecto
    documents = UrlDocument.objects.all()
    carrer_id = request.GET.get('carrer_id', None)
    year = request.GET.get('year', None)

    if query:
        query_upper = query.upper()
        query_lower = query.lower()
        

        documents = documents.filter(
            Q(title__icontains=query_upper) |
            Q(authors__icontains=query) | # Modifica según los campos de tu modelo
            Q(year__icontains=query) | 
            Q(carrer__name__icontains=query_lower) 
        )

    if carrer_id:
        documents = documents.filter(carrer_id=carrer_id)
    
    if year:
        documents = documents.filter(year=year)

    documents = documents.order_by(sort_by)  # Ordenar por el campo especificado



    paginator = DocumentPagination()
    result_page = paginator.paginate_queryset(documents, request)
    serializer = DocumentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

# ViewSets para otras vistas
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = UrlDocument.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]

# ViewSets para otras vistas
class FileDocumentViewSet(viewsets.ModelViewSet):
    queryset = FileDocument.objects.all()
    serializer_class = FileDocumentSerializer
    permission_classes = [AllowAny]



class CarrerViewSet(viewsets.ModelViewSet):
    queryset = Carrer.objects.all()
    serializer_class = CarrerSerializer


class DocumentTypeList(viewsets.ModelViewSet):
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer
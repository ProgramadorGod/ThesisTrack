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

from datetime import datetime
# Clase de paginación
class DocumentPagination(PageNumberPagination):
    page_size = 30


# ViewSets para otras vistas
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = UrlDocument.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        file_document = serializer.save(year=datetime.now().year)
        file_document.authors.add(self.request.user)


# ViewSets para otras vistas
class FileDocumentViewSet(viewsets.ModelViewSet):
    queryset = FileDocument.objects.all()
    serializer_class = FileDocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Guarda el documento sin los autores primero
        file_document = serializer.save()
        
        # Asigna el usuario autenticado como autor en el campo `authors`
        file_document.authors = [self.request.user.username]  # Como es una lista, lo asignamos directamente
        file_document.save()

class CarrerViewSet(viewsets.ModelViewSet):
    queryset = Carrer.objects.all()
    serializer_class = CarrerSerializer


class DocumentTypeList(viewsets.ModelViewSet):
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer


class DocumentStagesList(viewsets.ModelViewSet):
    queryset = DocumentStage.objects.all()
    serializer_class = DocumentStageSerializer



from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import Q
from .models import UrlDocument, FileDocument
from .serializers import DocumentSerializer

# Paginación personalizada
class DocumentPagination(PageNumberPagination):
    page_size = 30

# Función auxiliar para filtrar, combinar y paginar documentos
def get_filtered_documents(request, username=None):
    query = request.GET.get('query', '')
    sort_by = request.GET.get('sort_by', 'title')  # Ordenar por título por defecto
    carrer_id = request.GET.get('carrer_id', None)
    year = request.GET.get('year', None)

    documents = UrlDocument.objects.all()
    file_documents = FileDocument.objects.all()

    # Si se proporciona un username, filtramos por ese usuario
    if username:
        documents = documents.filter(authors__contains=username)
        file_documents = file_documents.filter(authors__contains=username)

    if query:
        query_upper = query.upper()
        query_lower = query.lower()

        documents = documents.filter(
            Q(title__icontains=query_upper) |
            Q(authors__icontains=query) |
            Q(year__icontains=query) |
            Q(carrer__name__icontains=query_lower)
        )

        file_documents = file_documents.filter(
            Q(title__icontains=query_upper) |
            Q(authors__icontains=query) |
            Q(year__icontains=query) |
            Q(carrer__name__icontains=query_lower)
        )

    if carrer_id:
        documents = documents.filter(carrer_id=carrer_id)
        file_documents = file_documents.filter(carrer_id=carrer_id)

    if year:
        documents = documents.filter(year=year)
        file_documents = file_documents.filter(year=year)

    combined_docs = documents.union(file_documents).order_by(sort_by)

    paginator = DocumentPagination()
    result_page = paginator.paginate_queryset(combined_docs, request)
    serializer = DocumentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

# Vista para la lista de documentos con filtrado y paginación

@api_view(["GET"])
@permission_classes([AllowAny])
def document_list(request):
    return get_filtered_documents(request)

# Vista para la lista de documentos del usuario autenticadofrom rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class UserDocumentsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        username = request.user.username
        return get_filtered_documents(request, username=username)
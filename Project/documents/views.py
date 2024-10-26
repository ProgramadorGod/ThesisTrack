import base64
import uuid
import hashlib
import random

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q, Count, Case, When, IntegerField
from .models import UrlDocument, DocumentStage, DocumentType, Carrer, FileDocument
from .serializers import DocumentSerializer, DocumentStageSerializer, DocumentTypeSerializer, FileDocumentSerializer, CarrerSerializer, CreateFileDocSerializer

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

class FileDocumentViewSet(viewsets.ModelViewSet):
    queryset = FileDocument.objects.all()
    serializer_class = FileDocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Guarda el documento sin los autores primero
        file_document = serializer.save()
        
        # Asigna el usuario autenticado como autor en el campo `authors`
        file_document.authors.add(self.request.user)  # Asignamos como lista

class CarrerViewSet(viewsets.ModelViewSet):
    queryset = Carrer.objects.all()
    serializer_class = CarrerSerializer

class DocumentTypeList(viewsets.ModelViewSet):
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer

class DocumentStagesList(viewsets.ModelViewSet):
    queryset = DocumentStage.objects.all()
    serializer_class = DocumentStageSerializer

# Función auxiliar para filtrar, combinar y paginar documentos
from django.db.models import Value

# Función auxiliar para filtrar, combinar y paginar documentos
def get_filtered_documents(request, username=None):
    query = request.GET.get('query', '')
    sort_by = request.GET.get('sort_by', 'title')
    carrer_id = request.GET.get('carrer_id', None)
    year = request.GET.get('year', None)

    documents = UrlDocument.objects.all()
    file_documents = FileDocument.objects.all()

    # Si se proporciona un username, filtramos por ese usuario
    if username:
        username_parts = username.split()
        author_filter = Q()
        for part in username_parts:
            author_filter |= Q(authors__icontains=part.strip())
        
        documents = documents.filter(author_filter)
        file_documents = file_documents.filter(author_filter)

    # Inicializar un filtro para la búsqueda
    query_filter = Q()
    if query:
        query_parts = query.split()
        
        # Crear un filtro combinando las partes de la consulta
        for part in query_parts:
            query_filter |= (Q(authors__icontains=part) | 
                             Q(title__icontains=part) | 
                             Q(year__icontains=part))

        # Aplicar el filtro de búsqueda
        documents = documents.filter(query_filter)
        file_documents = file_documents.filter(query_filter)

    if carrer_id:
        documents = documents.filter(carrer_id=carrer_id)
        file_documents = file_documents.filter(carrer_id=carrer_id)

    if year:
        documents = documents.filter(year=year)
        file_documents = file_documents.filter(year=year)

    # Si el query está vacío, obtenemos documentos de forma aleatoria
    if not query:
        documents = documents.order_by('?')
        file_documents = file_documents.order_by('?')

    # Anotar la cantidad de coincidencias antes de la unión
    if query_filter:  # Si `query_filter` tiene condiciones
        documents = documents.annotate(
            match_count=Count(
                Case(
                    When(query_filter, then=1),
                    output_field=IntegerField(),
                )
            )
        )
        file_documents = file_documents.annotate(
            match_count=Count(
                Case(
                    When(query_filter, then=1),
                    output_field=IntegerField(),
                )
            )
        )
    else:
        # Si no hay `query_filter`, asignamos match_count=0 por defecto
        documents = documents.annotate(match_count=Value(0, output_field=IntegerField()))
        file_documents = file_documents.annotate(match_count=Value(0, output_field=IntegerField()))

    # Combinar los documentos
    combined_docs = documents.union(file_documents)

    # Ordenar los documentos combinados por la cantidad de coincidencias y el criterio de ordenación
    combined_docs = combined_docs.order_by('-match_count', sort_by)

    paginator = DocumentPagination()
    result_page = paginator.paginate_queryset(combined_docs, request)
    serializer = DocumentSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


# Vista para la lista de documentos con filtrado y paginación
@api_view(["GET"])
@permission_classes([AllowAny])
def document_list(request):
    return get_filtered_documents(request)

# Vista para la lista de documentos del usuario autenticado
class UserDocumentsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        username = request.user.username
        return get_filtered_documents(request, username=username)

# Función para incrementar las visualizaciones de un documento
def increment_visualizations(document):
    document.visualizations += 1  # Aumentar el contador de visualizaciones
    document.save()  # Guardar el documento


@api_view(["GET"])
@permission_classes([AllowAny])
def document_detail(request, pk):
    try:
        document = UrlDocument.objects.get(pk=pk)
    except UrlDocument.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Incrementar visualizaciones
    increment_visualizations(document)

    # Serializar y retornar el documento
    serializer = DocumentSerializer(document)
    return Response(serializer.data)
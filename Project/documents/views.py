import base64
import uuid
import hashlib
import random

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q, Count, Case, When, IntegerField, F, Value, Sum
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
        file_document.authors.append(self.request.user.username)  # Usa .append() para listas
        file_document.save() 

class FileDocumentViewSet(viewsets.ModelViewSet):
    queryset = FileDocument.objects.all()
    serializer_class = FileDocumentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Guarda el documento sin los autores primero
        file_document = serializer.save()
        
        # Asigna el usuario autenticado como autor en el campo `authors`
        file_document.authors.append(self.request.user.username)  # Usa .append() para listas
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

# Función auxiliar para filtrar, combinar y paginar documentos
from django.db.models import Value

# Función auxiliar para filtrar, combinar y paginar documentos
def get_filtered_documents(request, username=None):
    query = request.GET.get('query', '')
    sort_by = request.GET.get('sort_by', 'title')
    carrer_id = request.GET.get('carrer_id', None)
    year = request.GET.get('year', None)
    show_titles = request.GET.get('show_titles', 'true') == 'true'
    show_carrers = request.GET.get('show_carrers', 'true') == 'true'
    show_authors = request.GET.get('show_authors', 'true') == 'true'
    show_years = request.GET.get('show_years', 'true') == 'true'

    # Inicializar queryset de documentos
    documents = UrlDocument.objects.all()
    file_documents = FileDocument.objects.all()

    # Filtrar por username si es necesario
    if username:
        author_filter = Q(authors__icontains=username)
        file_documents = file_documents.filter(author_filter)
        
        # Filtrar solo documentos con coincidencias exactas en authors
        exact_file_documents = [file_doc for file_doc in file_documents if file_doc.authors == [username]]
        
        # Aplicar filtros adicionales (query, carrer_id, year) solo a documentos exactos
        if query:
            if show_titles:
                query_filter |= Q(title__icontains=query)
            if show_authors:
                query_filter |= Q(authors__icontains=query)
            if show_years:
                query_filter |= Q(year__icontains=query)
            if show_carrers:
                query_filter |= Q(carrer__name__icontains=query)            


            exact_file_documents = [file_doc for file_doc in exact_file_documents if query_filter.check(file_doc)]
        
        if carrer_id:
            exact_file_documents = [file_doc for file_doc in exact_file_documents if file_doc.carrer_id == carrer_id]

        year_values = request.GET.getlist('year')
        if year_values:
            try:
                
                min_year, max_year = map(int, year_values)
                documents = documents.filter(year__range=(min_year, max_year))
            except ValueError:
                pass
                

        # Ordenar y paginar resultados
        combined_docs = exact_file_documents
        combined_docs.sort(key=lambda x: getattr(x, sort_by))
        paginator = DocumentPagination()
        result_page = paginator.paginate_queryset(combined_docs, request)
        serializer = FileDocumentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    else:
        query_filter = Q()
        query_parts = query.split() if query else []

        if query:
            # Crear anotaciones y ponderación
            for part in query_parts:
                if show_titles:
                    query_filter |= Q(title__icontains=query)
                if show_authors:
                    query_filter |= Q(authors__icontains=part)
                if show_years:
                    query_filter |= Q(year__icontains=part)
                if show_carrers:
                    query_filter |= Q(carrer__name__icontains=part)            
                documents = documents.filter(query_filter)

        if carrer_id:
            documents = documents.filter(carrer_id=carrer_id)

        year_values = request.GET.getlist('year')
        if year_values:
            try:
                
                min_year, max_year = map(int, year_values)
                documents = documents.filter(year__range=(min_year, max_year))
            except ValueError:
                pass

        if not query:
            documents = documents.order_by('title')
            paginator = DocumentPagination()
            result_page = paginator.paginate_queryset(documents, request)
            serializer = DocumentSerializer(result_page, many=True)
            return paginator.get_paginated_response(serializer.data)

        # Anotar el número de coincidencias en todos los campos relevantes
        documents = documents.annotate(
            match_score=Sum(
                Case(
                    When(Q(authors__icontains=query), then=3),
                    When(Q(title__icontains=query), then=2),
                    When(Q(year__icontains=query), then=1),
                    When(Q(carrer__name__icontains=query), then=1),
                    output_field=IntegerField()
                )
            )
        )

        # Ordenar por la puntuación de coincidencias y luego por el campo `sort_by`
        combined_docs = documents.order_by('-match_score', sort_by)

        # Paginación
        paginator = DocumentPagination()
        result_page = paginator.paginate_queryset(combined_docs, request)
        serializer = DocumentSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)






# Vista para la lista de documentos con filtrado y paginación
@api_view(["GET"])
@permission_classes([AllowAny])
def document_list(request):
    return get_filtered_documents(request)


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
        serializer_class = DocumentSerializer  # Usar el serializador adecuado para UrlDocument
    except UrlDocument.DoesNotExist:
        pass

    # Intentar obtener el documento en FileDocument si no se encontró en UrlDocument
        try:
            document = FileDocument.objects.get(pk=pk)
            serializer_class = FileDocumentSerializer  # Usar el serializador adecuado para FileDocument
        except FileDocument.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # Incrementar visualizaciones (funciona para ambos tipos de documentos)
    increment_visualizations(document)

    # Serializar y retornar el documento
    serializer = serializer_class(document)
    return Response(serializer.data)





def document_count_by_carrer(request):
    document_count = (
        UrlDocument.objects.values('carrer__name')
        .annotate(total_documents = Count('id'))
        .order_by('-total_documents')
    )

    data = list(document_count)
    return JsonResponse(data,safe=False, json_dumps_params={'ensure_ascii':False})




def document_count_by_year(request):
    document_count = (
        UrlDocument.objects.values('year')
        .annotate(total_documents = Count('id'))
        .order_by('-total_documents')
    )

    data = list(document_count)
    return JsonResponse(data,safe=False, json_dumps_params={'ensure_ascii':False})



def document_count_carrer_and_year(request):
    document_count = (
        UrlDocument.objects.values('carrer__name', 'year')
        .annotate(total_documents = Count('id'))
        .order_by('-total_documents')
    )

    data = list(document_count)
    return JsonResponse(data,safe=False, json_dumps_params={'ensure_ascii':False})



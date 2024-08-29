from rest_framework import serializers
from .models import UrlDocument, DocumentStage, DocumentType,Carrer, FileDocument
from datetime import datetime

from userz.serializers import AccountSerializer



class FileDocumentSerializer(serializers.ModelSerializer):
    carrer_name = serializers.SerializerMethodField()
    stage_name = serializers.SerializerMethodField()
    document_type_name = serializers.SerializerMethodField()


    class Meta:
        model = FileDocument
        exclude = ['authors']  # Excluye 'authors' en la creación (POST)
        extra_kwargs = {
            'authors': {'read_only': True}  # Haz que 'authors' sea solo lectura
        }

    def get_carrer_name(self, obj):
        return obj.carrer.name if obj.carrer else None

    def get_stage_name(self, obj):
        return obj.stage.stage if obj.stage else None

    def get_document_type_name(self, obj):
        return obj.document_type.name if obj.document_type else None

    def create(self, validated_data):
        file_document = FileDocument.objects.create(**validated_data)
        file_document.save()

        return file_document
    

    def to_representation(self, instance):
        """Incluye el campo 'authors' en las respuestas GET"""
        representation = super().to_representation(instance)
        representation['authors'] = instance.authors  # Añade 'authors' en la respuesta GET
        return representation


class CreateFileDocSerializer(serializers.Serializer):
    data = serializers.CharField(required=True)
    

class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = "__all__"
        
class CarrerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrer
        fields = "__all__"

class DocumentStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentStage
        fields = "__all__"

class DocumentSerializer(serializers.ModelSerializer):
    carrer_name = serializers.SerializerMethodField()
    stage_name = serializers.SerializerMethodField()
    document_type_name = serializers.SerializerMethodField()
    

    class Meta:
        model = UrlDocument
        fields = "__all__"  

    def get_carrer_name(self, obj):
        return obj.carrer.name if obj.carrer else None

    def get_stage_name(self, obj):
        return obj.stage.stage if obj.stage else None

    def get_document_type_name(self, obj):
        return obj.document_type.name if obj.document_type else None
    



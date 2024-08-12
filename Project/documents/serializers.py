from rest_framework import serializers
from .models import UrlDocument, DocumentStage, DocumentType,Carrer, FileDocument



class FileDocumentSerializer(serializers.ModelSerializer):
    carrer_name = serializers.SerializerMethodField()
    stage_name = serializers.SerializerMethodField()
    document_type_name = serializers.SerializerMethodField()
    class Meta:
        model = FileDocument
        fields = '__all__'
    
    def get_carrer_name(self, obj):
        return obj.carrer.name if obj.carrer else None

    def get_stage_name(self, obj):
        return obj.stage.stage if obj.stage else None

    def get_document_type_name(self, obj):
        return obj.document_type.name if obj.document_type else None


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
        fields = ["id", "code", "title", "authors", "year", "url", "is_visible", 
        "progress_percentage", "carrer", "carrer_name", "stage", "stage_name",
        "document_type" , "document_type_name" 
        ]

    def get_carrer_name(self, obj):
        return obj.carrer.name if obj.carrer else None

    def get_stage_name(self, obj):
        return obj.stage.stage if obj.stage else None

    def get_document_type_name(self, obj):
        return obj.document_type.name if obj.document_type else None
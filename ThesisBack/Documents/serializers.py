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

    def create(self, validated_data):
        users_data = validated_data.pop('users', None)
        doc_type_data = validated_data.pop('doc_type')

        document = Document.objects.create(
            doc_type=DocumentType.objects.get(id=doc_type_data['id']), 
            **validated_data
        )

        if users_data:
            for user_data in users_data:
                user = User.objects.get(id=user_data['id'])
                document.users.add(user)
        else:
            # Assign default user if no users provided
            default_user = User.objects.get(username='root')
            document.users.add(default_user)
        
        return document

    def update(self, instance, validated_data):
        users_data = validated_data.pop('users', None)
        doc_type_data = validated_data.pop('doc_type', None)

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.filee = validated_data.get('filee', instance.filee)
        
        if doc_type_data is not None:
            instance.doc_type = DocumentType.objects.get(id=doc_type_data['id'])
        
        instance.save()

        if users_data is not None:
            instance.users.clear()
            for user_data in users_data:
                user = User.objects.get(id=user_data['id'])
                instance.users.add(user)
        else:
            # Assign default user if no users provided
            default_user = User.objects.get(username='root')
            instance.users.clear()
            instance.users.add(default_user)

        return instance
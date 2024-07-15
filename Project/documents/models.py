from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class DocumentType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DocumentStatus(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DocumentStage(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Document(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    document_type = models.ForeignKey(DocumentType, on_delete=models.CASCADE)
    is_visible = models.BooleanField(default=True)
    status = models.ForeignKey(DocumentStatus, on_delete=models.CASCADE)
    stage = models.ForeignKey(DocumentStage, on_delete=models.CASCADE)
    progress_percentage = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')

    def __str__(self):
        return self.title

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class DocumentType(models.Model):
    name = models.CharField(max_length=255, default="Thesis")
    description = models.CharField(max_length=500, default="Upgrading the world")

    def __str__(self) -> str:
        return self.name



class Document(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=255)
    description =models.CharField(max_length=500, default="Description")
    filee = models.FileField(upload_to="documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    doc_type = models.ForeignKey(DocumentType, on_delete=models.SET_DEFAULT, default=1, null=True, related_name="documents")

    def __str__(self):
        return self.title
        

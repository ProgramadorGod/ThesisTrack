from django.db import models
from django.conf import settings

class DocumentType(models.Model):
    name = models.CharField(max_length=50, default="Thesis")

    def __str__(self):
        return self.name

class Carrer(models.Model):
    name = models.CharField(max_length=130)
    code  = models.CharField(max_length=10, default="New")
    def __str__(self):
        return self.name

class DocumentStage(models.Model):
    stage = models.CharField(max_length=30)
    
    def __str__(self):
        return self.stage

class AbstractBaseDocument(models.Model):
    
    carrer = models.ForeignKey(Carrer, on_delete=models.SET_DEFAULT, default=1)
    title = models.CharField(max_length=400, default="Untitled")
    authors = models.JSONField(default=list)
    year = models.CharField(max_length=4, default="0000")
    is_visible = models.BooleanField(default=True)
    stage = models.ForeignKey(DocumentStage, on_delete=models.SET_NULL, null=True)
    progress_percentage = models.FloatField(default=0.0)
    document_type = models.ForeignKey(DocumentType, on_delete=models.SET_NULL, null=True)

    class Meta:
        abstract = True


class UrlDocument(AbstractBaseDocument):
    url = models.URLField(default="https://example.com")


    def __str__(self):
        return self.title


class FileDocument(AbstractBaseDocument):
    file = models.FileField(upload_to="files/")


    def __str__(self):
        return self.title


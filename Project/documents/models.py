from django.db import models
from django.conf import settings

class DocumentType(models.Model):
    name = models.CharField(max_length=50, default="Thesis")

    def __str__(self):
        return self.name

class Carrer(models.Model):
    name = models.CharField(max_length=5000)
    code  = models.CharField(max_length=10, default="New")
    def __str__(self):
        return self.name

class DocumentStage(models.Model):
    stage = models.CharField(max_length=30)
    
    def __str__(self):
        return self.stage

class AbstractBaseDocument(models.Model):    
    carrer = models.ForeignKey(Carrer, on_delete=models.CASCADE)
    title = models.CharField(max_length=600, default="Untitled")
    authors = models.JSONField(default=list)
    year = models.CharField(max_length=10, default="2024")
    is_visible = models.BooleanField(default=True)
    stage = models.ForeignKey(DocumentStage, on_delete=models.SET_NULL, null=True)
    progress_percentage = models.FloatField(default=0.0)
    document_type = models.ForeignKey(DocumentType, on_delete=models.SET_NULL, null=True)
    visualizations = models.IntegerField(default=1)
    class Meta:
        abstract = True


class UrlDocument(AbstractBaseDocument):
    url = models.URLField(default="https://example.com", max_length=900)
    description = models.CharField(max_length=500, default="Este documento fue realizado en la era previa al calendario B del 2024, sin embargo puedes analizar su descripción leyendo la introducción del documento, seguramente te pueda ser de mucha utilidad.")


    def __str__(self):
        return self.title


class FileDocument(AbstractBaseDocument):
    file = models.FileField(upload_to="files/")
    description = models.CharField(max_length=400, default="This document is actually pretty awesome and the author doesn't want to steal you the surprise of discovery its content.")

    def __str__(self):
        return self.title


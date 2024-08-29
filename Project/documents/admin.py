from django.contrib import admin
from .models import UrlDocument, DocumentStage, DocumentType,Carrer, FileDocument
# Register your models here.

admin.site.register(UrlDocument)
admin.site.register(FileDocument)
admin.site.register(DocumentStage)
admin.site.register(DocumentType)
admin.site.register(Carrer)



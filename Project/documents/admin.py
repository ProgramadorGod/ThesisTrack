from django.contrib import admin
from .models import Document, DocumentStage, DocumentStatus, DocumentType
# Register your models here.

admin.site.register(Document)
admin.site.register(DocumentStage)
admin.site.register(DocumentStatus)
admin.site.register(DocumentType)

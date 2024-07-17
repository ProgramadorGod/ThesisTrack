from django.contrib import admin
from .models import Document, DocumentStage, DocumentType,Carrer
# Register your models here.

admin.site.register(Document)
admin.site.register(DocumentStage)
admin.site.register(DocumentType)
admin.site.register(Carrer)



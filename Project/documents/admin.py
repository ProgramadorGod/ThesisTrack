from django.contrib import admin
from .models import UrlDocument, DocumentStage, DocumentType,Carrer, FileDocument
# Register your models here.
class UrlDocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'url')  # Ajusta los campos según tu modelo
    search_fields = ('id', 'title', 'url')  # Habilita la búsqueda


admin.site.register(UrlDocument, UrlDocumentAdmin)
admin.site.register(FileDocument)
admin.site.register(DocumentStage)
admin.site.register(DocumentType)
admin.site.register(Carrer)



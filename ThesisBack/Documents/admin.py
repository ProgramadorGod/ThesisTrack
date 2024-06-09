from django.contrib import admin
from .models import Document, DocumentType
# Register your models here.

class DocumentAdmin(admin.ModelAdmin):
    filter_horizontal = ("users",)

admin.site.register(Document,DocumentAdmin)
admin.site.register(DocumentType)

from django.core.management.base import BaseCommand
from documents.models import UrlDocument

class Command(BaseCommand):
    help = 'Retorna las IDs de documentos con años inválidos (incluyendo "Undefined")'

    def handle(self, *args, **kwargs):
        # Filtra documentos cuyo "Año" no sea un número de 4 dígitos o sea "Undefined"
        invalid_documents = UrlDocument.objects.exclude(year__regex=r'^\d{4}$')

        if not invalid_documents:
            self.stdout.write("✅ No hay documentos con años inválidos.")
        else:
            self.stdout.write(f"⚠️ Se encontraron {len(invalid_documents)} documentos con años inválidos. Mostrando IDs:")

            for document in invalid_documents:
                self.stdout.write(f"📄 ID del documento con año inválido: {document.id}")

from django.core.management.base import BaseCommand
import os
import json
from documents.models import UrlDocument, DocumentType, DocumentStage, Carrer

# Ruta donde están los archivos JSON
JSON_DIR = "/data/pages"

def get_or_create_document_type():
    return DocumentType.objects.get_or_create(name="Thesis")[0]

def get_or_create_stage():
    return DocumentStage.objects.get_or_create(stage="Finalizado")[0]

def normalize_filename(name):
    return name.lower().endswith('.json') and name.startswith("trabajos_de_grado")

def clean_career_name(career_name):
    # Eliminar "TRABAJOS DE GRADO" y recortar a 200 caracteres si es necesario
    cleaned_name = career_name.replace("TRABAJOS DE GRADO", "").strip()
    return cleaned_name[:150]  # Asegurarse de que no exceda los 200 caracteres

class Command(BaseCommand):
    help = 'Crea objetos UrlDocument a partir de los archivos JSON'

    def handle(self, *args, **kwargs):
        document_type = get_or_create_document_type()
        stage = get_or_create_stage()

        for filename in os.listdir(JSON_DIR):
            if not normalize_filename(filename):
                continue

            filepath = os.path.join(JSON_DIR, filename)

            with open(filepath, encoding="utf-8") as f:
                data = json.load(f)

            carrer_name = data.get("career")
            if not carrer_name:
                self.stdout.write(f"⚠️  Carrera no encontrada en {filename}")
                continue

            # Limpiar el nombre de la carrera
            carrer_name = clean_career_name(carrer_name)

            works = data.get("works", [])
            if not works:
                self.stdout.write(f"📭 No hay datos en {filename}")
                continue

            code = data.get("CarrerCode", "N/A")
            carrer, _ = Carrer.objects.get_or_create(name=carrer_name, defaults={"code": code})

            for entry in works:
                title = entry.get("title", "Untitled")
                authors = entry.get("authors", [])
                year = entry.get("year", "2024")
                url = entry.get("link", "https://example.com")

                if UrlDocument.objects.filter(title=title, carrer=carrer).exists():
                    continue  # evitar duplicados

                UrlDocument.objects.create(
                    carrer=carrer,
                    title=title,
                    authors=authors,
                    year=year,
                    url=url,
                    document_type=document_type,
                    stage=stage,
                    visualizations=1,
                    progress_percentage=100.0
                )

            self.stdout.write(f"✅ Insertados documentos de: {carrer_name}")

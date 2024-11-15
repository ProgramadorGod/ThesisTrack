import os
import django

# Configuración del entorno de Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Project.settings")  # Cambia "tu_proyecto" al nombre correcto
django.setup()

import json
from documents.models import UrlDocument  # Cambia `myapp` por el nombre de tu aplicación

# Cargar urls.json
with open("./Files/urls.json", "r") as f:
    urls = json.load(f)

# Lista para almacenar los datos en el nuevo formato
document_data = []

# Iterar sobre cada URL y obtener los datos correspondientes
for i, url in enumerate(urls):
    try:
        # Buscar el documento correspondiente en la base de datos (tomar el primero si hay múltiples)
        doc = UrlDocument.objects.filter(url=url).first()
        if doc:
            document_data.append({
                "id": doc.id,
                "title": doc.title,
                "year": doc.year,
                "carrer": doc.carrer.name,
            })
        else:
            print(f"No se encontró un documento para la URL: {url}")
        
        # Mostrar progreso cada 100 URLs procesadas
        if i % 100 == 0:
            print(f"Procesadas {i + 1} URLs...")

    except Exception as e:
        print(f"Error procesando la URL {url}: {e}")

# Guardar el resultado en un nuevo archivo JSON
with open("./Files/document_data.json", "w") as f:
    json.dump(document_data, f, indent=4)

print("Archivo document_data.json generado exitosamente.")

import os
import django
import sys
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Project.settings')
django.setup()

import requests
from bs4 import BeautifulSoup
from django.db import transaction
from documents.models import UrlDocument, DocumentType, Carrer, DocumentStage


def fetch_google_sheet_links(main_url):
    print(f'📥 Obteniendo enlaces desde: {main_url}')
    response = requests.get(main_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    links = []
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if 'docs.google.com/spreadsheets' in href:
            print(f'🔗 Encontrado enlace a hoja de cálculo: {href}')
            links.append(href)
    print(f'✅ Total de hojas encontradas: {len(links)}')
    return links


def extract_data_from_sheet(sheet_url):
    print(f'\n🧾 Extrayendo datos desde hoja: {sheet_url}')
    response = requests.get(sheet_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    data = []
    table = soup.find('table')
    if not table:
        print('⚠️ No se encontró una tabla en esta hoja.')
        return data
    rows = table.find_all('tr')[1:]
    for row in rows:
        cells = row.find_all('td')
        if len(cells) < 7:
            continue
        code = cells[0].get_text(strip=True)
        item = cells[1].get_text(strip=True)
        title = cells[2].get_text(strip=True)
        authors_raw = cells[3]
        authors = [br.strip() for br in authors_raw.stripped_strings]
        year = cells[4].get_text(strip=True)
        link_tag = cells[5].find('a', href=True)
        url = link_tag['href'] if link_tag else ''
        data.append({
            'code': code,
            'item': item,
            'title': title,
            'authors': authors,
            'year': year,
            'url': url
        })
        
    for i, d in enumerate(data_list[:3]):
        print(f"\n📑 Fila {i+1}:")
        print(f"  Código: {d['code']}")
        print(f"  Título: {d['title']}")
        print(f"  Autores: {d['authors']}")
        print(f"  Año: {d['year']}")
        print(f"  URL: {d['url']}")

    print(f'📄 Total de documentos encontrados: {len(data)}')
    return data


def save_documents(data_list):
    default_carrer = Carrer.objects.first()
    default_stage = DocumentStage.objects.first()
    default_type = DocumentType.objects.first()

    if not all([default_carrer, default_stage, default_type]):
        print("🚨 Faltan datos por defecto para insertar (carrera, etapa o tipo)")
        return

    insertados = 0

    for data in data_list:
        if not data['title'] or not data['url']:
            print(f"⚠️ Fila incompleta: {data}")
            continue

        if UrlDocument.objects.filter(title=data['title']).exists():
            print(f"🔁 Ya existía: {data['title']}")
            continue

        doc = UrlDocument(
            title=data['title'],
            authors=data['authors'],
            year=data['year'],
            url=data['url'],
            carrer=default_carrer,
            stage=default_stage,
            document_type=default_type
        )
        doc.save()
        insertados += 1
        print(f"✅ Insertado: {data['title']}")

    print(f"\n📦 Total insertados: {insertados}")


def main():
    main_url = 'https://unipaz.edu.co/bibliotesis/'
    sheet_links = fetch_google_sheet_links(main_url)
    for sheet_url in sheet_links:
        data_list = extract_data_from_sheet(sheet_url)
        save_documents(data_list)


if __name__ == '__main__':
    main()

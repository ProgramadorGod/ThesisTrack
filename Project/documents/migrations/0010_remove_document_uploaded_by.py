# Generated by Django 4.2.11 on 2024-07-16 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0009_document_carrer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='uploaded_by',
        ),
    ]
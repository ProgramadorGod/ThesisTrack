# Generated by Django 4.2.11 on 2024-06-08 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Documents', '0007_document_aaa'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='Aaa',
        ),
        migrations.DeleteModel(
            name='A',
        ),
    ]

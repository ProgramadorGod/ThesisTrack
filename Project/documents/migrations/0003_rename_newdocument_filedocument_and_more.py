# Generated by Django 4.2.11 on 2024-08-08 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0002_newdocument'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='NewDocument',
            new_name='FileDocument',
        ),
        migrations.RenameModel(
            old_name='Document',
            new_name='UrlDocument',
        ),
    ]
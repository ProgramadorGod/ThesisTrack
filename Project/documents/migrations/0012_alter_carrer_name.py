# Generated by Django 4.2.11 on 2024-07-18 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0011_alter_document_authors_alter_document_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carrer',
            name='name',
            field=models.CharField(max_length=130),
        ),
    ]
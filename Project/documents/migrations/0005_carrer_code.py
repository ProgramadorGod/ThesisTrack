# Generated by Django 4.2.11 on 2024-08-15 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0004_filedocument_authors_filedocument_carrer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='carrer',
            name='code',
            field=models.CharField(default='New', max_length=10),
        ),
    ]

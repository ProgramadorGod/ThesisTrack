# Generated by Django 4.2.11 on 2024-07-15 20:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '0006_alter_document_uploaded_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='uploaded_by',
            field=models.ForeignKey(default=30, on_delete=django.db.models.deletion.CASCADE, related_name='uploaded_documents', to=settings.AUTH_USER_MODEL),
        ),
    ]
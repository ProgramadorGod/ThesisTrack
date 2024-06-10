from django.urls import path
from .views import DocumentUploadView,DocumentListView,DocumentTypeListView

urlpatterns = [
    path("upload/",DocumentUploadView.as_view(), name="document_upload"),
    path("", DocumentListView.as_view(), name="document_list"),
    path("types/", DocumentTypeListView.as_view(), name="document_types"),
]

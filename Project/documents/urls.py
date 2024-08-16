from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'documents', views.DocumentViewSet)
router.register(r'carrers', views.CarrerViewSet)
router.register(r'file_docs', views.FileDocumentViewSet)
router.register(r'doc-types', views.DocumentTypeList)
router.register(r'doc-stages', views.DocumentStagesList)

urlpatterns = [
    path("documentz/", views.document_list, name="document-list"),
    path('',include(router.urls))
]

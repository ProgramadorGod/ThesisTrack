from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'documents', views.DocumentViewSet)
router.register(r'carrers', views.CarrerViewSet)
router.register(r'file_docs', views.FileDocumentViewSet)
router.register(r'doc-types', views.DocumentTypeList)
router.register(r'doc-stages', views.DocumentStagesList)
router.register(r'my-docs', views.UserDocumentsViewSet, basename="user-documents" )


urlpatterns = [
    path("documentz/", views.document_list, name="document-list"),
    path('',include(router.urls)),
    path('upgradeview/<int:pk>/', views.document_detail, name='document-detail'),
    path('document-count-by-carrer/', views.document_count_by_carrer, name="document-count-by-carrer"),
    path('document-count-by-year/', views.document_count_by_year, name="document-count-by-year"),
    path('document-count-by-carrer-and-year/', views.document_count_carrer_and_year, name="document-count-by-year")

]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet,CarrerViewSet

router = DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'carrers', CarrerViewSet)


urlpatterns = [
    path('',include(router.urls))
]

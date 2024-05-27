from django.urls import path
from . import views


urlpatterns = [
    path("", views.home),
    path("logout/", views.logout),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),

]
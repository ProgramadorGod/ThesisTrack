from django.urls import path
from .views import AccountListCreate,CustomLogoutView,CustomLoginView,OwnLoginView,refresh_csrf

urlpatterns = [
    path("accounts/", AccountListCreate.as_view() ),
    path("logout/", CustomLogoutView.as_view(), name="logout"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("login2/", OwnLoginView.as_view(), name="OwnLogin"),
    path('refresh_csrf/', refresh_csrf, name='refresh_csrf'),

]

from django.urls import path
from .views import AccountListCreate,CustomLogoutView,CustomLoginView,OwnLoginView

urlpatterns = [
    path("accounts/", AccountListCreate.as_view() ),
    path("logout/", CustomLogoutView.as_view(), name="logout"),
    path("login/", CustomLoginView.as_view(), name="login"),
    path("login2/", OwnLoginView.as_view(), name="OwnLogin"),
]

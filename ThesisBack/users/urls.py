#Uniproyects/users/urls.py


from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    # path("logout/", views.logout),
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('logout/', views.CustomLogoutView.as_view(), name='account_logout'),
    path("login/", views.GoogleLogin.as_view(), name="login_view"),
    path("userchange2/", views.change_username, name="changeusername"),
    path("UserChange/", views.UpdateUsernameView.as_view(), name="userchange")
]   
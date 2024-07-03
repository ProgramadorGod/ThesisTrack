from django.contrib import admin
from django.urls import path,include
from .views import redirect_to_react

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('userz.urls')),
    path("accounts/",include("allauth.urls")),
    path("", redirect_to_react),
    path("react/", redirect_to_react),
    path("rest-auth/", include("dj_rest_auth.urls"), name="dj_rest_auth"),

    
]

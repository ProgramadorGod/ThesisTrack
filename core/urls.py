from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('users.urls')),
    path("accounts/",include("allauth.urls")),
    path("rest-auth/", include("dj_rest_auth.urls"), name="dj_rest_auth"),
]

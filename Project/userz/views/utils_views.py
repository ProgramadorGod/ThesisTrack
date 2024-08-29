from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.middleware.csrf import get_token
from django.contrib.auth import logout as auth_logout

Port = "http://127.0.0.1:3000/"

def home(request):
    return HttpResponseRedirect(Port)

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect(Port)

def refresh_csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

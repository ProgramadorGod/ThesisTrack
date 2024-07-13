from django.shortcuts import redirect

def redirect_to_react(request):
    return redirect("http://192.168.0.17:3000")
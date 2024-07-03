from django.shortcuts import redirect

def redirect_to_react(request):
    return redirect("http://127.0.0.1:3000")
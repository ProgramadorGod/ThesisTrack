from django.shortcuts import redirect, render

def redirect_to_react(request):
    # return redirect("http://192.168.0.17:3000")
    # return redirect("http://172.10.8.55:3000")
    return redirect("http://127.0.0.1:3000")


def home(request):
    return render(request, 'index.html')
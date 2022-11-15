from django.http import HttpResponse
from django.shortcuts import render


def home_page(request):
  context = {'title': 'my_title'}
  return render(request, 'index.html')

def home_page2(request):
    return render(request, 'indexprofil.html', {'title': 'About'})

def sahrul(request):
    return render(request, 'sahrul.html', {'title': 'About'})

def cv(request):
    return render(request, 'cv.html', {'title': 'About'})

from django import template
from django.shortcuts import render
from django.http import HttpResponse
from django.template import context, loader

def index(request):
    template = loader.get_template('gmap/index.html')
    context = {}
    return HttpResponse(template.render(context, request
    ))

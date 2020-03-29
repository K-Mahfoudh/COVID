from django.shortcuts import render
import time
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
from main import update_data


# Create your views here.

def home_view(request):
	context = {

	}
	return render(request,'home.html',context)

@api_view(['GET'])
def update_view(request):
    return JsonResponse(update_data.main())
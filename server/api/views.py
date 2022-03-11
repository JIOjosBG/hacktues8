from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 

from .serializers import MeasurementsSerializer
from measurements.models import Measurements

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/measurements-list/',
        'Create': '/measurement-create/',
        'test':'watafak'
    }
    return Response(api_urls)

@api_view(['GET'])
def measurementsList(request):
    measurements = Measurements.objects.all()
    serializer = MeasurementsSerializer(measurements,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def measurementCreate(request):
    serializer = MeasurementsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)
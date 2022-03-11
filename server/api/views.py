from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from datetime import datetime

from .serializers import MeasurementsSerializer
from measurements.models import Measurements
from bases.models import Base

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'all_measurements':{
        'List': '/measurements-list/',
        'List between two dates': '/measurements-list/YYYY-MM-DDThh:mm:ss/YYYY-MM-DDThh:mm:ss/',
        'Last': '/measurement-last/',
        'Create': '/measurement-create/',
        'test':'watafak'
        },
        'bases':{
            "Bases list":'/bases-list/',
            "List of measurements for base":'/measurements-list/<int:pk>'
        }
    }
    return Response(api_urls)

@api_view(['GET'])
def measurementsList(request):
    measurements = Measurements.objects.all()
    serializer = MeasurementsSerializer(measurements,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def measurementsListByDate(request,start,end):    
    start_time = datetime.strptime(start,'%Y-%m-%dT%H:%M:%S')
    end_time = datetime.strptime(end,'%Y-%m-%dT%H:%M:%S')
    measurements = Measurements.objects.filter(measured_at__range=(start_time, end_time))

    serializer = MeasurementsSerializer(measurements,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def measurementLast(request):
    measurement = Measurements.objects.last()

    serializer = MeasurementsSerializer(measurement)
    return Response(serializer.data)


@api_view(['POST'])
def measurementCreate(request):
    serializer = MeasurementsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)


@api_view(['GET'])
def basesList(request):
    bases = Base.objects.all()
    serializer = BaseSerializer(bases,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def measurementsListForBase(request,pk):
    measurements = Measurements.objects.filter(base=pk)
    serializer = MeasurementsSerializer(measurements,many=True)
    return Response(serializer.data)
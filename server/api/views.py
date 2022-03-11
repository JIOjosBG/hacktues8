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
        'average':'/averages/YYYY-MM-DDThh:mm:ss/YYYY-MM-DDThh:mm:ss/<int:pk>'
        },
        'bases':{
            'Bases list':'/bases-list/',
            'List of measurements for base':'/measurements-list/<int:pk>',
            'List between two dates for base' : '/measurements-list/YYYY-MM-DDThh:mm:ss/YYYY-MM-DDThh:mm:ss/<int:pk>',

        },

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


@api_view(['GET'])
def measurementsListByDateForBase(request,start,end,pk):    
    start_time = datetime.strptime(start,'%Y-%m-%dT%H:%M:%S')
    end_time = datetime.strptime(end,'%Y-%m-%dT%H:%M:%S')
    measurements = Measurements.objects.filter(base=pk,measured_at__range=(start_time, end_time))

    serializer = MeasurementsSerializer(measurements,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def averages(request,start,end,pk):    
    start_time = datetime.strptime(start,'%Y-%m-%dT%H:%M:%S')
    end_time = datetime.strptime(end,'%Y-%m-%dT%H:%M:%S')
    measurements = Measurements.objects.filter(base=pk,measured_at__range=(start_time, end_time))
    average_data={
        "temperature": 0,
        "humidity": 0,
        "light": 0,
        "wind": 0,
        "pressure": 0,
        "safe": 1
    }
    serializer = MeasurementsSerializer(measurements,many=True)
    data = serializer.data
    for m in data:
        for i in m:
            if(i != 'measured_at' and i != 'base' and i != 'safe'):
               average_data[i]=average_data[i]+m[i]/len(data)
    print(average_data)
    return Response(average_data)


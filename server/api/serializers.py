from rest_framework import serializers

from measurements.models import Measurements
from bases.models import Base

class MeasurementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurements
        #fields = '__all__'
        fields = ['measured_at','temperature','humidity','light','wind','pressure','base','safe']
        
class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Base
        fields = '__all__'
        #fields = ['measured_at','temperature','humidity','light','wind','pressure','safe']
        
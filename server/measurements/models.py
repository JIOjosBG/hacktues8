from django.db import models
from django.utils import timezone
import os
from functools import reduce
#from datetime import datetime, timezone

from bases.models import Base
class Measurements(models.Model):
    measured_at = models.DateTimeField(default=timezone.now)
    temperature = models.FloatField(null=False)
    humidity = models.FloatField(null=False)
    light = models.FloatField(null=False)
    wind  = models.FloatField(null=False)
    pressure = models.FloatField(null=False)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)



    @property
    def safe(self):
        median_values = []
        module_dir = os.path.dirname(__file__)  # get current directory
        file_path = os.path.join(module_dir, 'median_values/'+self.base.planet+'.txt')
        f = open(file_path,'r')
        data = f.read()
        data = data.split("\n")
        for i in range(len(data)):
            data[i]=data[i].split(',')
            data[i][0]=int(data[i][0])
            data[i][1]=int(data[i][1])
        f.close()

        indexes = []
        indexes.append(1-abs((self.temperature-data[0][0])/(data[0][1]*2)))
        indexes.append(1-abs((self.humidity-data[1][0])/(data[1][1]*2)))
        indexes.append(1-abs((self.light-data[2][0])/(data[2][1]*2)))
        indexes.append(1-abs((self.wind-data[3][0])/(data[3][1]*2)))
        indexes.append(1-abs((self.pressure-data[4][0])/(data[4][1]*2)))
        
        i=1
        print(indexes)
        i=reduce(lambda a,b: a*b,indexes)
        return i

    def __str__(self):
        return str(self.safe)
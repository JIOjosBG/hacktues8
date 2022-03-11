from django.db import models
from django.utils.timezone import datetime as datetime 
class Measurements(models.Model):
    measured_at = models.DateTimeField(default=datetime.now)
    temperature = models.FloatField(null=False)
    humidity = models.FloatField(null=False)
    light = models.FloatField(null=False)
    wind = models.FloatField(null=False)


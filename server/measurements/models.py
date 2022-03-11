from django.db import models
#from django.utils.timezone import datetime as datetime
from datetime import datetime
class Measurements(models.Model):
    measured_at = models.DateTimeField(default=datetime.now)
    temperature = models.FloatField(null=False)
    humidity = models.FloatField(null=False)
    light = models.FloatField(null=False)
    wind = models.FloatField(null=False)
    pressure = models.FloatField(null=False)

    @property
    def safe(slef):
        return 1


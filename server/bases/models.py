from django.db import models
#from django.utils.timezone import datetime as datetime
from datetime import datetime

class Base(models.Model):
    created_at = models.DateTimeField(default=datetime.now)
    planet = models.CharField(max_length=128,null=False, default='Mars')
    name = models.CharField(max_length=128,null=False,default='base_1')

    def __str__(self):
        return self.name


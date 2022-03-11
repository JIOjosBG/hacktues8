from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import datetime as datetime 


class CustomUser(AbstractUser):
    created_at = models.DateTimeField(default=datetime.now)
    updated_at = models.DateTimeField(default=datetime.now)


# Generated by Django 4.0.3 on 2022-03-11 08:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Measurements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('measured_at', models.DateTimeField(default=datetime.datetime.now)),
                ('temperature', models.FloatField()),
                ('humidity', models.FloatField()),
                ('light', models.FloatField()),
                ('wind', models.FloatField()),
            ],
        ),
    ]
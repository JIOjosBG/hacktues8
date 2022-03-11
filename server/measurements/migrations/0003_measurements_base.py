# Generated by Django 4.0.3 on 2022-03-11 21:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bases', '0001_initial'),
        ('measurements', '0002_measurements_pressure'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurements',
            name='base',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='bases.base'),
            preserve_default=False,
        ),
    ]

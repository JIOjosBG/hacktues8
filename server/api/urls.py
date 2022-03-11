from django.urls import path, re_path
from . import views
urlpatterns = [
    path('',views.apiOverview,name="api-overview"),
    path('measurements-list/',views.measurementsList,name="measurements-list"),

    re_path(r'^measurements-list/(?P<start>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<end>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/$', views.measurementsListByDate),
    path('measurement-list/\d{4}-\d{2}-\d{2})/',views.measurementCreate,name="measurements-list-by-date"),

    
    path('measurement-create/',views.measurementCreate,name="measurement-create"),
    
    
]
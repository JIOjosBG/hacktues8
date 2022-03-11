from django.urls import path
from . import views
urlpatterns = [
    path('',views.apiOverview,name="api-overview"),
    path('measurements-list/',views.measurementsList,name="measurements-list"),
    path('measurement-create/',views.measurementCreate,name="measurement-create")
    
]
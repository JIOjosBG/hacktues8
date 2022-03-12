from django.urls import path, re_path
from . import views
urlpatterns = [
    path('',views.apiOverview,name="api-overview"),
    path('measurements-list/',views.measurementsList,name="measurements-list"),
    re_path(r'^measurements-list/(?P<start>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<end>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/$', views.measurementsListByDate),
    path('measurement-list/\d{4}-\d{2}-\d{2})/',views.measurementCreate,name="measurements-list-by-date"),
    path('measurement-create/',views.measurementCreate,name="measurement-create"),
    path('measurement-last/',views.measurementLast,name="measurement-last"),

    path('bases-list/',views.basesList,name="bases-list"),
    path('measurements-list/<int:pk>',views.measurementsListForBase,name="measurements-list-for-base"),
    re_path(r'^measurements-list/(?P<start>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<end>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<pk>[0-9]|[0-9][0-9])/', views.measurementsListByDateForBase),
    re_path(r'^averages/(?P<start>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<end>[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2})/(?P<pk>[0-9]|[0-9][0-9])/', views.averages),

    path('average-min-max/day/<int:pk>',views.averageDay,name="average-day"),
    path('average-min-max/week/<int:pk>',views.averageWeek,name="average-week"),
    path('average-min-max/month/<int:pk>',views.averageMonth,name="average-month"),
]
from django.urls import path
from .views import ConnectPlatformView, DashboardView

urlpatterns = [
    path('connect/',   ConnectPlatformView.as_view(), name='connect_platform'),
    path('dashboard/', DashboardView.as_view(),       name='analytics_dashboard'),
]

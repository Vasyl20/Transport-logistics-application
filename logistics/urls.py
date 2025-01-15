from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DriverViewSet, VehicleViewSet, CargoViewSet, RouteViewSet,
    LogViewSet, VehicleMaintenanceViewSet, VehicleGeolocationViewSet, PaymentViewSet
)

router = DefaultRouter()
router.register(r'drivers', DriverViewSet, basename='driver')
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'cargo', CargoViewSet, basename='cargo')
router.register(r'routes', RouteViewSet, basename='route')
router.register(r'logs', LogViewSet, basename='log')
router.register(r'maintenance', VehicleMaintenanceViewSet, basename='vehiclemaintenance')
router.register(r'geolocation', VehicleGeolocationViewSet, basename='vehiclegeolocation')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = [
    path('api/', include(router.urls)),
]

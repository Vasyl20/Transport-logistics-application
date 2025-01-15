from rest_framework import viewsets
from .models import Driver, Vehicle, Cargo, Route, Log, VehicleMaintenance, VehicleGeolocation, Payment
from .serializers import (
    DriverSerializer, VehicleSerializer, CargoSerializer, RouteSerializer,
    LogSerializer, VehicleMaintenanceSerializer, VehicleGeolocationSerializer, PaymentSerializer
)


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer


class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    serializer_class = LogSerializer


class VehicleMaintenanceViewSet(viewsets.ModelViewSet):
    queryset = VehicleMaintenance.objects.all()
    serializer_class = VehicleMaintenanceSerializer


class VehicleGeolocationViewSet(viewsets.ModelViewSet):
    queryset = VehicleGeolocation.objects.all()
    serializer_class = VehicleGeolocationSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

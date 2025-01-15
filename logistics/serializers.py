from rest_framework import serializers
from .models import Driver, Vehicle, Cargo, Route, Log, VehicleMaintenance, VehicleGeolocation, Payment


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'


class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = '__all__'


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'


class VehicleMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleMaintenance
        fields = '__all__'


class VehicleGeolocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleGeolocation
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

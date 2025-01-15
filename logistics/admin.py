from django.contrib import admin
from .models import Driver, Vehicle, Cargo, Route, Log, VehicleMaintenance, VehicleGeolocation, Payment


@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'middle_name', 'phone_number', 'address')
    search_fields = ('first_name', 'last_name', 'phone_number')
    list_filter = ('last_name',)


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'license_plate', 'vin_code', 'driver')
    search_fields = ('brand', 'model', 'license_plate', 'vin_code')
    list_filter = ('brand',)
    autocomplete_fields = ('driver',)


@admin.register(Cargo)
class CargoAdmin(admin.ModelAdmin):
    list_display = ('name', 'weight', 'customer', 'vehicle')
    search_fields = ('name', 'customer')
    list_filter = ('customer',)
    autocomplete_fields = ('vehicle',)


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('cargo', 'sender_address', 'sending_datetime', 'delivery_address', 'delivery_datetime')
    search_fields = ('sender_address', 'delivery_address')
    list_filter = ('sending_datetime', 'delivery_datetime')
    autocomplete_fields = ('cargo',)


@admin.register(Log)
class LogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'timestamp')
    search_fields = ('user__username', 'action')
    list_filter = ('timestamp',)


@admin.register(VehicleMaintenance)
class VehicleMaintenanceAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'description', 'date', 'cost')
    search_fields = ('vehicle__license_plate', 'description')
    list_filter = ('date',)
    autocomplete_fields = ('vehicle',)


@admin.register(VehicleGeolocation)
class VehicleGeolocationAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'latitude', 'longitude', 'timestamp')
    search_fields = ('vehicle__license_plate',)
    list_filter = ('timestamp',)
    autocomplete_fields = ('vehicle',)


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'method', 'status')
    search_fields = ('order__name',)
    list_filter = ('method', 'status')
    autocomplete_fields = ('order',)

from django.contrib import admin
from .models import Driver, Vehicle, Cargo, Operation

admin.site.register(Driver)
admin.site.register(Vehicle)
admin.site.register(Cargo)
admin.site.register(Operation)

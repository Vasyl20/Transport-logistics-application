
from django.db import models

class Driver(models.Model):
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    plate_number = models.CharField(max_length=15, unique=True)
    model = models.CharField(max_length=100)
    driver = models.OneToOneField(Driver, on_delete=models.CASCADE, related_name='vehicle')

    def __str__(self):
        return f"{self.model} ({self.plate_number})"

class Cargo(models.Model):
    description = models.TextField()
    weight = models.FloatField()

    def __str__(self):
        return f"{self.description} ({self.weight} kg)"

class Operation(models.Model):
    OPERATION_TYPES = [
        ('load', 'Завантаження'),
        ('unload', 'Вивантаження'),
    ]

    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='operations')
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE, related_name='operations')
    operation_type = models.CharField(max_length=10, choices=OPERATION_TYPES)
    location = models.CharField(max_length=255)
    sequence = models.PositiveIntegerField()  # Послідовність виконання операцій

    def __str__(self):
        return f"{self.get_operation_type_display()} - {self.cargo.description} at {self.location} (Seq: {self.sequence})"

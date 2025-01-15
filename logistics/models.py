from django.db import models
from django.core.validators import RegexValidator, MinValueValidator
from django.contrib.auth.models import User  # Для прив'язки до користувачів


class Driver(models.Model):
    first_name = models.CharField(
        max_length=50,
        verbose_name="Ім'я",
        validators=[RegexValidator(regex='^[A-Za-zА-Яа-я\'\s]+$', message="Ім'я має містити лише літери.")],
        default="Дані не визначені"
    )
    last_name = models.CharField(
        max_length=50,
        verbose_name="Прізвище",
        validators=[RegexValidator(regex='^[A-Za-zА-Яа-я\'\s]+$', message="Прізвище має містити лише літери.")],
        default="Дані не визначені"
    )
    middle_name = models.CharField(
        max_length=50,
        verbose_name="По батькові",
        blank=True,
        null=True
    )
    phone_number = models.CharField(
        max_length=15,
        verbose_name="Номер телефону",
        validators=[RegexValidator(regex='^\+?\d{10,15}$', message="Введіть коректний номер телефону.")],
        default="0000000000"
    )
    address = models.TextField(verbose_name="Адреса проживання", default="Дані не визначені")

    def __str__(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}".strip()


class Vehicle(models.Model):
    brand = models.CharField(max_length=50, verbose_name="Марка", default="Дані не визначені")
    model = models.CharField(max_length=50, verbose_name="Модель", default="Дані не визначені")
    license_plate = models.CharField(
        max_length=20,
        verbose_name="Номер машини",
        unique=True,
        validators=[RegexValidator(regex='^[A-Za-z0-9\-]+$', message="Номер машини має містити лише літери, цифри та дефіс.")],
        default="Невідомий номер"
    )
    vin_code = models.CharField(
        max_length=17,
        verbose_name="VIN код",
        unique=True,
        validators=[RegexValidator(regex='^[A-HJ-NPR-Z0-9]{17}$', message="Введіть коректний VIN код.")],
        default="Невідомий VIN"
    )
    driver = models.ForeignKey(
        'Driver',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Водій"
    )

    def __str__(self):
        driver_info = f", Водій: {self.driver.last_name} {self.driver.first_name}" if self.driver else ""
        return f"{self.brand} {self.model} ({self.license_plate}){driver_info}"


class Cargo(models.Model):
    name = models.CharField(max_length=100, verbose_name="Назва грузу", default="Дані не визначені")
    weight = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Вага",
        validators=[MinValueValidator(0.1, "Вага має бути більше 0.")],
        default=0.1
    )
    customer = models.CharField(max_length=100, verbose_name="Замовник", default="Невідомий замовник")
    additional_info = models.TextField(verbose_name="Додаткова інформація", blank=True, null=True)
    vehicle = models.ForeignKey(
        'Vehicle',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Машина для доставки"
    )

    def __str__(self):
        return f"{self.name} ({self.weight} кг)"


class Route(models.Model):
    cargo = models.OneToOneField(
        Cargo,
        on_delete=models.CASCADE,
        related_name="route",
        verbose_name="Груз"
    )
    sender_address = models.TextField(verbose_name="Адреса відправки", default="Невідома адреса")
    sending_datetime = models.DateTimeField(verbose_name="Дата і час відправки")
    delivery_address = models.TextField(verbose_name="Адреса доставки", default="Невідома адреса")
    delivery_datetime = models.DateTimeField(verbose_name="Дата і час доставки")
    operator_contact = models.TextField(verbose_name="Контакти оператора", blank=True, null=True)

    def __str__(self):
        return f"Маршрут: {self.sender_address} -> {self.delivery_address}"


class Log(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Користувач")
    action = models.TextField(verbose_name="Дія")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Час виконання")

    def __str__(self):
        return f"{self.user.username} - {self.action} ({self.timestamp})"


class VehicleMaintenance(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, verbose_name="Машина")
    description = models.TextField(verbose_name="Опис обслуговування")
    date = models.DateField(verbose_name="Дата обслуговування")
    cost = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Вартість обслуговування")

    def __str__(self):
        return f"Обслуговування {self.vehicle.license_plate} ({self.date})"


class VehicleGeolocation(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, verbose_name="Машина")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name="Широта")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, verbose_name="Довгота")
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name="Час фіксації")

    def __str__(self):
        return f"Геолокація {self.vehicle.license_plate} ({self.timestamp})"


class Payment(models.Model):
    PAYMENT_METHODS = [
        ('cash', 'Готівка'),
        ('card', 'На карту'),
    ]
    order = models.ForeignKey(Cargo, on_delete=models.CASCADE, verbose_name="Замовлення")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Сума")
    method = models.CharField(max_length=10, choices=PAYMENT_METHODS, verbose_name="Спосіб оплати")
    status = models.BooleanField(default=False, verbose_name="Статус оплати")

    def __str__(self):
        return f"Оплата {self.order.name} ({'Успішно' if self.status else 'Очікується'})"

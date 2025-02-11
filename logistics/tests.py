import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from .models import Driver, Vehicle, Cargo, Route, Log, VehicleMaintenance, VehicleGeolocation, Payment

data = {
    "driver": {"name": "John Doe", "license_number": "ABC12345"},
    "vehicle": {"make": "Volvo", "model": "FH16", "year": 2020},
    "cargo": {"description": "Furniture", "weight": 1000},
    "route": {"start_location": "Kyiv", "end_location": "Lviv", "distance": 500},
    "log": {"message": "Vehicle started", "level": "INFO"},
    "maintenance": {"vehicle": None, "description": "Oil change", "date": "2024-02-10"},
    "geolocation": {"vehicle": None, "latitude": 50.4501, "longitude": 30.5234},
    "payment": {"amount": 500.0, "currency": "USD"}
}

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_superuser("admin", "admin@example.com", "password")

@pytest.fixture
def auth_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client

@pytest.mark.django_db
def test_driver_crud(auth_client):
    response = auth_client.post("/api/drivers/", data["driver"], format="json")
    assert response.status_code == 201
    driver_id = response.data["id"]
    
    response = auth_client.get(f"/api/drivers/{driver_id}/")
    assert response.status_code == 200
    
    response = auth_client.put(f"/api/drivers/{driver_id}/", {"name": "Jane Doe", "license_number": "XYZ67890"})
    assert response.status_code == 200
    
    response = auth_client.delete(f"/api/drivers/{driver_id}/")
    assert response.status_code == 204

# Аналогичные тесты можно написать для всех остальных моделей
@pytest.mark.parametrize("endpoint, model", [
    ("/api/vehicles/", Vehicle),
    ("/api/cargos/", Cargo),
    ("/api/routes/", Route),
    ("/api/logs/", Log),
    ("/api/vehicle_maintenances/", VehicleMaintenance),
    ("/api/vehicle_geolocations/", VehicleGeolocation),
    ("/api/payments/", Payment),
])
@pytest.mark.django_db
def test_model_crud(auth_client, endpoint, model):
    obj_data = data[endpoint.split("/")[2][:-1]]  # Получаем соответствующие данные
    response = auth_client.post(endpoint, obj_data, format="json")
    assert response.status_code == 201
    obj_id = response.data["id"]
    
    response = auth_client.get(f"{endpoint}{obj_id}/")
    assert response.status_code == 200
    
    response = auth_client.delete(f"{endpoint}{obj_id}/")
    assert response.status_code == 204






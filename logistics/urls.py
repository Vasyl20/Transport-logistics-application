from rest_framework.routers import DefaultRouter
from .views import DriverViewSet, VehicleViewSet, CargoViewSet, OperationViewSet

router = DefaultRouter()
router.register(r'drivers', DriverViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'cargos', CargoViewSet)
router.register(r'operations', OperationViewSet)

urlpatterns = router.urls

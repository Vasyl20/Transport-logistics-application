# from .models import LoadingUnloadingPoint, Cargo

# def create_loading_unloading_points(cargo_id):
#     try:
#         # Отримуємо об'єкт вантажу
#         cargo = Cargo.objects.get(id=cargo_id)
        
#         # Створюємо точку завантаження
#         LoadingUnloadingPoint.objects.create(
#             cargo=cargo,
#             is_loading=True,
#             address=cargo.loading_address,
#             time=cargo.loading_time
#         )
        
#         # Створюємо точку розвантаження
#         LoadingUnloadingPoint.objects.create(
#             cargo=cargo,
#             is_loading=False,
#             address=cargo.unloading_address,
#             time=cargo.unloading_time
#         )
#     except Cargo.DoesNotExist:
#         raise ValueError("Cargo with the given ID does not exist.")

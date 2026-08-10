from rest_framework.routers import DefaultRouter
from .views import FuncionarioViewSet

router = DefaultRouter()

router.register(
    "funcionarios",
    FuncionarioViewSet,
    basename="funcionario"
)

urlpatterns = router.urls
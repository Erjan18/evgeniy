from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="Исторические лица Кыргызстана API",
      default_version='v1',
      description="API для дипломной работы",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/auth/', include('users.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-swagger-json'),
]

# Убрали if DEBUG — теперь всегда добавляем static/media (важно для Railway)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Поддержка смены языка (если нужно)
from django.conf.urls.i18n import i18n_patterns
urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    prefix_default_language=False,
)
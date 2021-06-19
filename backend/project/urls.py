from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include('main.urls'))
]
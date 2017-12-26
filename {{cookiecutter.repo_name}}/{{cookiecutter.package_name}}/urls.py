from django.conf import settings
from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin

from {{ cookiecutter.package_name }}.views import HomePageView


urlpatterns = [
    # Examples:
    path('', HomePageView.as_view(), name='home'),
    # path('blog/', include('blog.urls')),

    path('admin/rq/', include('django_rq.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static

    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + \
        urlpatterns

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from {{ cookiecutter.package_name }}.views import HomePageView


urlpatterns = [
    # Examples:
    url(r'^$', HomePageView.as_view(), name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/rq/', include('django_rq.urls')),
    url(r'^admin/', include(admin.site.urls)),
]

if settings.DEBUG:
    import debug_toolbar
    from django.conf.urls.static import static
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls))
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + urlpatterns

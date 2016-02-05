from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', '{{ cookiecutter.package_name }}.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    {% if cookiecutter.use_rq == "y" -%}
    url(r'^admin/rq/', include('django_rq.urls')),
    {%- endif %}

    url(r'^admin/', include(admin.site.urls)),
]

"""
WSGI config for {{ cookiecutter.project_name }} project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""

import os
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "{{ cookiecutter.package_name }}.settings")

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

public_path = os.path.join(os.path.dirname(__file__), 'public')

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
application.add_files(public_path, prefix='/')

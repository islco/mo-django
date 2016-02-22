import os
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE", "{{ cookiecutter.package_name }}.settings")

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

public_path = os.path.join(
    os.path.dirname(os.path.dirname(__file__)), 'public')

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
application.add_files(public_path, prefix='/')

from django.apps import AppConfig


class {{ cookiecutter.package_name | title }}Config(AppConfig):
    name = '{{ cookiecutter.package_name }}'

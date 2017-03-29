from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as UAdmin

from .models import User


@admin.register(User)
class UserAdmin(UAdmin):
    pass

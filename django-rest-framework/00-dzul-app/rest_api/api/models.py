from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):
    def create_user(self, user_name, password, **other_fields):
        if not user_name:
            raise ValueError(_('Debes de darme un nombre de usuario'))

        user = self.model(user_name=user_name, **other_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, user_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(_('El usuario debe ser de tipo administrador'))
        if other_fields.get('is_superuser') is not True:
            raise ValueError(_('El usuario debe ser de tipo administrador'))

        return self.create_user(user_name, password, **other_fields)

class User(AbstractBaseUser):
    user_name = models.CharField(max_length=100, unique=True, null=False)
    # password = models.CharField(max_length=30, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()
    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = []

class Profile(models.Model):
    name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=100, null=False)
    age = models.IntegerField()
    phone = models.CharField(max_length=10, null=False)
    email = models.EmailField(max_length=100, null=False, unique=True)
    password = models.CharField(max_length=10, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class Address(models.Model):
    street = models.CharField(max_length=150, null=False)
    building_number = models.CharField(max_length=10, null=False)
    apartment_number = models.CharField(max_length=10, null=True)
    neighborhood = models.CharField(max_length=100, null=False)
    zip_code = models.CharField(max_length=6, null=False)
    municipality = models.CharField(max_length=100, null=False)
    city = models.CharField(max_length=100, null=False)
    state = models.CharField(max_length=50, null=False)
    user = models.ForeignKey(Profile, related_name='profile_address', on_delete=models.CASCADE, null=True, blank=True)

class Zip_code(models.Model):
    zip_code = models.CharField(max_length=6, null=False)
    neighborhood = models.CharField(max_length=100, null=False)
    municipality = models.CharField(max_length=100, null=False)
    state = models.CharField(max_length=50, null=False)
    city = models.CharField(max_length=100, null=False)

class Contact(models.Model):
    kinship = models.CharField(max_length=50)
    name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    phone = models.CharField(max_length=10, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Profile, related_name='profile_contact', on_delete=models.CASCADE, null=True, blank=True)

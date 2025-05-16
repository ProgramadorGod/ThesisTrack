from django.db import models
from django.contrib.auth.models import AbstractUser


class UserType(models.Model):
    UserType = models.CharField(max_length=30)

    def __str__(self):
        return self.UserType


class Account(AbstractUser):
    UserType = models.ForeignKey(UserType, on_delete=models.SET_NULL, null=True)
    stars_given = models.IntegerField(default=0)
    documents_uploaded = models.IntegerField(default=0)
    documents_downloaded = models.IntegerField(default=0)
    comments_made = models.IntegerField(default=0)
    feedback_received = models.IntegerField(default=0)
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True, default="profile_pictures/default.jpg")  # Nuevo campo

    def __str__(self) -> str:
        return self.username

    def get_profile_picture_url(self):
        """Devuelve la URL de la imagen de perfil o una por defecto si no hay ninguna."""
        if self.profile_picture:
            return self.profile_picture.url
        return "/media/profile_pictures/default.jpg"

from django.db import models
from django.contrib.auth.models import AbstractUser

class UserType(models.Model):
    UserType = models.CharField(max_length=30)

    def __str__(self):
        return (self.UserType)
    


class Account(AbstractUser):
    UserType  = models.ForeignKey(UserType, on_delete=models.SET_DEFAULT, default=1)
    def __str__(self) -> str:
        return (self.username)
    


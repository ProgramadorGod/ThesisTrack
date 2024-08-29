from django.db import models
from django.contrib.auth.models import AbstractUser

class UserType(models.Model):
    UserType = models.CharField(max_length=30)

    def __str__(self):
        return (self.UserType)
    


class Account(AbstractUser):
    UserType  = models.ForeignKey(UserType, on_delete=models.SET_DEFAULT, default=1)
    stars_given = models.IntegerField(default=0)
    documents_uploaded = models.IntegerField(default=0)
    documents_downloaded = models.IntegerField(default=0)
    comments_made = models.IntegerField(default=0)
    feedback_received = models.IntegerField(default=0)

    def __str__(self) -> str:
        return (self.username)
    

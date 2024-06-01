from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Carrer(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return(self.name)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=30,blank=True)
    address = models.CharField(max_length=30,blank=True)
    Carrer = models.ManyToManyField(Carrer, max_length=30,blank=True)

    def __str__(self):
        return self.user.username
    


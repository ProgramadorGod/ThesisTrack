from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.





class Carrer(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return(self.name)
    
class User_Type(models.Model):
    User_type = models.CharField(max_length=40)

    def __str__(self) -> str:
        return (self.User_type)




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=30,blank=True)
    address = models.CharField(max_length=30,blank=True)
    User_Type = models.ForeignKey(User_Type, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.username
    
class StudentProfile(Profile):
    Carrer = models.ForeignKey(Carrer,on_delete=models.SET_NULL, blank=True, null=True)
    Semester =  models.CharField(max_length=20, blank=True)
    Docs_Amount =  models.IntegerField(default=0)


class TeacherProfile(Profile):
    Docs_Amount = models.IntegerField(default=0)


#UPDATE users_profile SET User_Type_id=1 WHERE User_Type_id IS NULL;

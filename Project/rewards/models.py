from django.db import models
from userz.models import Account
# Create your models here.


class Reward(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)

    def add_points(self,points):
        self.points += points
        self.update_level()
    
    def update_level(self):
        if self.points >= 1000:
            self.level = 4
        
        if self.points >= 500:
            self.level = 3

        if self.points >= 100:
            self.level = 2

        else:
            self.level = 1

        
    def __str__(self):
        return f"{self.user.username} - Level {self.level} - Points {self.points}"

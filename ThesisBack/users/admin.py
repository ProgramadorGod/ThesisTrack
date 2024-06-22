from django.contrib import admin
from .models import Profile,Carrer, User_Type

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'address', 'User_Type')
    search_fields = ('user_username', 'user.email')






admin.site.register(Profile,ProfileAdmin)
admin.site.register(Carrer)
admin.site.register(User_Type)
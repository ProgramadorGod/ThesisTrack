from django.contrib import admin
from .models import Profile,Carrer

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'gender', 'address')
    search_fields = ('user_username', 'user.email', "user.Carrer")
    filter_horizontal = ('Carrer',)



admin.site.register(Profile,ProfileAdmin)
admin.site.register(Carrer)
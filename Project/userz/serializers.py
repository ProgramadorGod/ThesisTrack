from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()
    UserType = serializers.SerializerMethodField()


    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if request and obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        elif obj.profile_picture:
            return obj.profile_picture.url
        return None
    def get_UserType(self, obj):
        return obj.UserType.UserType if obj.UserType else None

    class Meta:
        model = Account
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "UserType",
            "profile_picture"
        ]



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)
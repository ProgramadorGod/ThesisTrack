# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

class UpdateUsernameSerializer(serializers.ModelSerializer):
    gender = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id",'username', "gender"]


    def get_gender(self, obj):
        social_account = obj.socialaccount_set.filter(provider='google').first()
        if social_account:
            extra_data = social_account.extra_data
            return extra_data.get('gender', None)
        return None
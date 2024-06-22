from django.dispatch import receiver
from allauth.account.signals import user_logged_in
from allauth.socialaccount.models import SocialAccount
from django.db.models.signals import post_save



@receiver(user_logged_in)
def save_profile(sender, request, user, **kwargs):

    social_account = SocialAccount.objects.filter(user=user, provider='google').first()
    

    if social_account:
        extra_data = social_account.extra_data
        print(extra_data)

        
        gender = extra_data.get('gender', None)
        # print("LOOOOOOKK AT ME!!!!!!!!!!!!:GENDER",gender)


        if gender:
            user.profile.gender = gender
            user.profile.save()

from django.contrib.auth.models import User
from .models import Profile,User_Type

@receiver(post_save,sender=Profile)
def SetDefaultUserType(sender, request,created, **kwargs):
    if created and not isinstance.UserType:
        try:
            studentType = User_Type.objects.get(User,User_type="Student")
            isinstance.User_Type = studentType
            isinstance.save()

        except:
            pass

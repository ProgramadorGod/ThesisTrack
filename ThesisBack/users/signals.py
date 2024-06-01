from django.dispatch import receiver
from allauth.account.signals import user_logged_in
from allauth.socialaccount.models import SocialAccount



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


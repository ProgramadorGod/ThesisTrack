"""
Django settings for Project project.

Generated by 'django-admin startproject' using Django 4.2.11.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-j^zmtqwdc5lqw69u=ummtsc(5ws495c$9q79#unqu#wq&)+p)t'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


SITE_ID=4
REST_USE_JWT = True



# Application definition

INSTALLED_APPS = [
    #django
    'admin_interface',
    'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #my apps
    'userz',
    'documents',
    'rewards',

    #thirdparty apps
    'rest_framework',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'dj_rest_auth',
    'rest_framework.authtoken',
    'corsheaders',

]

X_FRAME_OPTIONS = "SAMEORIGIN"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware', 
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'Project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Project.wsgi.application'

ALLOWED_HOSTS =["*"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",

    "http://127.0.0.1:3000", 

    "http://192.168.0.17:3000",

    'http://10.7.49.90:3000',
     # Cambia esto a la URL de tu frontend
]


CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    'http://127.0.0.1:3000',
    'http://192.168.0.17:3000',
    'http://10.7.49.90:3000',
    'http://10.7.49.90',
    'http://10.7.49.90:8000',
]


CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    'http://127.0.0.1:3000', 
    'http://10.7.49.90:3000',
    'http://10.7.49.90',
    'http://10.7.49.90:8000', # La URL de tu frontend
]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ttdatabase',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST':'127.0.0.1',
        'PORT':'3306'


    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SOCIALACCOUNT_PROVIDERS = {
    "google":{
        "SCOPE":[
            "profile",
            "email",

        ],
        "AUTH_PARAMS":{
            "access_type":"online"
        },
        "APP":{
            'client_id':'244269923642-3d3cf5n9nf9cr1o6qid0e9dbghe32i19.apps.googleusercontent.com',
            'secret':'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',
            'key':'',
        },
        
        'REDIRECT_URI': 'http://127.0.0.1:8000/accounts/google/login/callback/',
        

        

    }

}

SOCIALACCOUNT_LOGIN_ON_GET=True ## IMPORTANTE SKIP DE CONFIRMACIÓN DE LOGIN DE GOOGLE

ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_REQUIRED = True
SOCIALACCOUNT_QUERY_EMAIL = True



import os
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend"
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}



LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/react/"




AUTH_USER_MODEL = "userz.Account"













#                                   ++++*******==++++++++++******#*+++-+++                            
#                                  -*##%%######+###%##%###%%%%#%%###**+*+%*                           
#                                  :%%%%%+#%%%#**+=#%*%##%#%##%%%#%#%#*++##                           
#                                   :--*%+##+==:#*=%*+++**+%##%**+-:-+*++#*                           
#                                      *%+###   ##=#*     =###%*     +%+*#*                           
#                                      +%*#*+   #+=#+     =%##%*     +*-+++                           
#                                      +%=*++             =%##%*                                      
#                                      +#+*#*             +%#*%*                                      
#                                      =#==*#             +%+*%*                                      
#                                      =%+###             +#-+**                                      
#                                      =%*##*             +#+*%#                                      
#                                      +%+##*             -###%#                                      
#                           *##+%:     +%+##*     +%=%%*  =###%#                                      
#                           *#+*#:     +%*##*     +#+%%*  =#**%*                                      
#                           **+++%##%%%%%*###%%%%#%*=***%#%%#*%%%%*+                                  
#                           *#=-=-++***#*+*****+****+**=++*++=++===-                                  
#                           +***=%**#%%#%%%%########*##*####**#%%#**    
from pathlib import Path
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-me-in-production')

DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',

    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_yasg',

    'api',
    'users',
    'historical_figures',
]

AUTH_USER_MODEL = 'users.User'

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

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

LANGUAGE_CODE = 'ru'
TIME_ZONE = 'Asia/Bishkek'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ====================== STATIC & MEDIA ======================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

STATICFILES_DIRS = [
    BASE_DIR / 'config' / 'static',
]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ====================== DRF + JWT ======================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

# ====================== CORS ======================
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# ====================== SECURITY ======================
# ====================== SECURITY ======================
CSRF_TRUSTED_ORIGINS = [
    'https://evgeniy-production-a3b7.up.railway.app',
    'https://*.railway.app',
    'https://*.up.railway.app',
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# ====================== JAZZMIN ======================
JAZZMIN_SETTINGS = {
    "site_title": "Исторические лица Кыргызстана",
    "site_header": "Админ-панель",
    "site_brand": "Кыргызстан Тарыхы",
    "welcome_sign": "Добро пожаловать в админ-панель",
    "copyright": "Евгений — Диплом 2026",

    "show_sidebar": True,
    "navigation_expanded": True,
    "show_ui_builder": True,

    "changeform_format": "collapsible",
    "custom_css": "css/custom_admin.css",

    "topmenu_links": [
        {"name": "На сайт", "url": "/", "new_window": True},
    ],

    "icons": {
        "historical_figures.historicalfigure": "fas fa-user-tie",
        "historical_figures.comment": "fas fa-comment-dots",
        "historical_figures.suggestion": "fas fa-lightbulb",
        "auth.user": "fas fa-users",
    },
}

JAZZMIN_UI_TWEAKS = {
    "theme": "darkly",
    "dark_mode_theme": "darkly",
    "navbar": "navbar-dark",
    "sidebar": "sidebar-dark-primary",
}
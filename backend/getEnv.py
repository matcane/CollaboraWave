from django.core.management.utils import get_random_secret_key

try:
    with open(".env", 'x') as file:
        file.write(f"SECRET_KEY = 'django-insecure-{get_random_secret_key()}'\n")
        file.write(f"NAME = ''\n")
        file.write(f"USER = ''\n")
        file.write(f"PASSWORD = ''\n")
        file.write(f"HOST = ''\n")
        file.write(f"PORT = ''\n")
except FileExistsError:
    print(f"The file .env already exists.")

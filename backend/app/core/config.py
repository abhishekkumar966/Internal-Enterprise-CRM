import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    # Application
    APP_NAME = os.getenv("APP_NAME", "Internal Enterprise CRM")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"

    # Database
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    # JWT
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_HOURS = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_HOURS", "24")
    )


settings = Settings()
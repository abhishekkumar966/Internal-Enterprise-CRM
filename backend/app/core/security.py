from datetime import datetime, timedelta
from jose import jwt, JWTError

from app.core.config import settings


def create_access_token(data: dict):
    payload = data.copy()

    payload["exp"] = (
        datetime.utcnow()
        + timedelta(hours=settings.ACCESS_TOKEN_EXPIRE_HOURS)
    )

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def verify_token(token: str):
    try:
        print("=" * 50)
        print("Received Token:", token)

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        print("Decoded Payload:", payload)
        print("=" * 50)

        return payload

    except JWTError as e:
        print("=" * 50)
        print("JWT ERROR:", str(e))
        print("=" * 50)
        return None
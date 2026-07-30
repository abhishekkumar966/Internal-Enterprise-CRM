from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: LoginRequest):

    if data.username != "admin" or data.password != "admin123":
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    payload = {
        "sub": "admin",
        "products": [
            "EduPulse",
            "CloudMetric",
        ],
    }

    token = create_access_token(payload)

    print("=" * 50)
    print("LOGIN SUCCESS")
    print("Payload:", payload)
    print("Token:", token)
    print("=" * 50)

    return {
        "access_token": token,
        "token_type": "bearer",
    }

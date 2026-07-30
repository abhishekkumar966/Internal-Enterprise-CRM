from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.security import verify_token

# HTTP Bearer Authentication
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Verify JWT token and return the decoded user payload.
    """
    payload = verify_token(credentials.credentials)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    return payload


def require_product(product_name: str):
    """
    Ensure the authenticated user has access
    to the requested product.
    """

    def checker(user=Depends(get_current_user)):
        products = user.get("products", [])

        if product_name not in products:
            raise HTTPException(
                status_code=403,
                detail=f"You are not authorized to access '{product_name}'",
            )

        return user

    return checker
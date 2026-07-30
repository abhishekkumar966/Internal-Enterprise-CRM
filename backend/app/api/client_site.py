from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.client_site import ClientSiteCreate
from app.core.auth import require_product

from app.services.client_site_service import (
    create_site,
    get_sites,
    update_site,
    delete_site,
)

router = APIRouter(
    prefix="/sites",
    tags=["Client Sites"],
)


@router.post("/")
def add_site(
    site: ClientSiteCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("CloudMetric")),
):
    return create_site(db, site)


@router.get("/")
def list_sites(
    db: Session = Depends(get_db),
    user=Depends(require_product("CloudMetric")),
):
    return get_sites(db)


@router.put("/{site_id}")
def edit_site(
    site_id: int,
    site: ClientSiteCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("CloudMetric")),
):
    result = update_site(db, site_id, site)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Client Site not found",
        )

    return result


@router.delete("/{site_id}")
def remove_site(
    site_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_product("CloudMetric")),
):
    result = delete_site(db, site_id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Client Site not found",
        )

    return result
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.template import TemplateCreate
from app.core.auth import require_product

from app.services.template_service import (
    create_template,
    get_templates,
    update_template,
    delete_template,
)

router = APIRouter(
    prefix="/templates",
    tags=["Message Templates"],
)


@router.post("/")
def add_template(
    template: TemplateCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    return create_template(db, template)


@router.get("/")
def list_templates(
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    return get_templates(db)


@router.put("/{template_id}")
def edit_template(
    template_id: int,
    template: TemplateCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    result = update_template(db, template_id, template)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    return result


@router.delete("/{template_id}")
def remove_template(
    template_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    result = delete_template(db, template_id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    return result
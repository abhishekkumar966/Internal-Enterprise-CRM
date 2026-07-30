from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.plan import PlanCreate
from app.core.auth import require_product

from app.services.plan_service import (
    create_plan,
    get_plans,
    update_plan,
    delete_plan,
)

router = APIRouter(
    prefix="/plans",
    tags=["Subscription Plans"],
)


@router.post("/")
def add_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    return create_plan(db, plan)


@router.get("/")
def list_plans(
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    return get_plans(db)


@router.put("/{plan_id}")
def edit_plan(
    plan_id: int,
    plan: PlanCreate,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    result = update_plan(db, plan_id, plan)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Plan not found",
        )

    return result


@router.delete("/{plan_id}")
def remove_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    user=Depends(require_product("EduPulse")),
):
    result = delete_plan(db, plan_id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Plan not found",
        )

    return result
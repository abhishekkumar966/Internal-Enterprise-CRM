from sqlalchemy.orm import Session
from app.models.plan import SubscriptionPlan
from app.schemas.plan import PlanCreate


def create_plan(db: Session, plan: PlanCreate):
    db_plan = SubscriptionPlan(**plan.model_dump())
    db.add(db_plan)
    db.commit()
    db.refresh(db_plan)
    return db_plan


def get_plans(db: Session):
    return db.query(SubscriptionPlan).all()


def update_plan(db: Session, plan_id: int, plan: PlanCreate):
    db_plan = db.query(SubscriptionPlan).filter(
        SubscriptionPlan.id == plan_id
    ).first()

    if not db_plan:
        return None

    db_plan.plan_name = plan.plan_name
    db_plan.price = plan.price
    db_plan.billing_cycle = plan.billing_cycle
    db_plan.features = plan.features

    db.commit()
    db.refresh(db_plan)

    return db_plan


def delete_plan(db: Session, plan_id: int):
    db_plan = db.query(SubscriptionPlan).filter(
        SubscriptionPlan.id == plan_id
    ).first()

    if not db_plan:
        return None

    db.delete(db_plan)
    db.commit()

    return {"message": "Plan deleted successfully"}
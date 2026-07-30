from pydantic import BaseModel
from typing import Dict, Any


class PlanCreate(BaseModel):
    plan_name: str
    price: float
    billing_cycle: str
    features: Dict[str, Any]


class PlanResponse(PlanCreate):
    id: int

    class Config:
        from_attributes = True
from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id = Column(Integer, primary_key=True, index=True)
    plan_name = Column(String(100), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    billing_cycle = Column(String(20), nullable=False)
    features = Column(JSONB, nullable=False)
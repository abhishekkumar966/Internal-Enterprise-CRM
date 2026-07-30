from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class MessageTemplate(Base):
    __tablename__ = "message_templates"

    id = Column(Integer, primary_key=True, index=True)
    template_name = Column(String(100), nullable=False)
    delivery_channel = Column(String(50), nullable=False)
    message_configuration = Column(JSONB, nullable=False)
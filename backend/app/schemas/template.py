from pydantic import BaseModel
from typing import Dict, Any


class TemplateCreate(BaseModel):
    template_name: str
    delivery_channel: str
    message_configuration: Dict[str, Any]


class TemplateResponse(TemplateCreate):
    id: int

    class Config:
        from_attributes = True
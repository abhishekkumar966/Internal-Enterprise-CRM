from sqlalchemy.orm import Session
from app.models.template import MessageTemplate
from app.schemas.template import TemplateCreate


def create_template(db: Session, template: TemplateCreate):
    obj = MessageTemplate(**template.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_templates(db: Session):
    return db.query(MessageTemplate).all()


def update_template(db: Session, template_id: int, template: TemplateCreate):
    obj = db.query(MessageTemplate).filter(
        MessageTemplate.id == template_id
    ).first()

    if not obj:
        return None

    obj.template_name = template.template_name
    obj.delivery_channel = template.delivery_channel
    obj.message_configuration = template.message_configuration

    db.commit()
    db.refresh(obj)

    return obj


def delete_template(db: Session, template_id: int):
    obj = db.query(MessageTemplate).filter(
        MessageTemplate.id == template_id
    ).first()

    if not obj:
        return None

    db.delete(obj)
    db.commit()

    return {"message": "Template deleted successfully"}
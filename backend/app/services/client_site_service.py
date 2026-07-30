from sqlalchemy.orm import Session
from app.models.client_site import ClientSite
from app.schemas.client_site import ClientSiteCreate


def create_site(db: Session, site: ClientSiteCreate):
    obj = ClientSite(**site.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_sites(db: Session):
    return db.query(ClientSite).all()


def update_site(db: Session, site_id: int, site: ClientSiteCreate):
    obj = db.query(ClientSite).filter(ClientSite.id == site_id).first()

    if not obj:
        return None

    obj.domain_name = site.domain_name
    obj.api_key = site.api_key
    obj.status = site.status
    obj.daily_request_quota = site.daily_request_quota

    db.commit()
    db.refresh(obj)

    return obj


def delete_site(db: Session, site_id: int):
    obj = db.query(ClientSite).filter(ClientSite.id == site_id).first()

    if not obj:
        return None

    db.delete(obj)
    db.commit()

    return {"message": "Client Site deleted successfully"}
from sqlalchemy import Column, Integer, String

from app.database import Base


class ClientSite(Base):
    __tablename__ = "client_sites"

    id = Column(Integer, primary_key=True, index=True)
    domain_name = Column(String(255), nullable=False)
    api_key = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False)
    daily_request_quota = Column(Integer, nullable=False)
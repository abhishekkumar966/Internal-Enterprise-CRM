from pydantic import BaseModel


class ClientSiteCreate(BaseModel):
    domain_name: str
    api_key: str
    status: str
    daily_request_quota: int


class ClientSiteResponse(ClientSiteCreate):
    id: int

    class Config:
        from_attributes = True
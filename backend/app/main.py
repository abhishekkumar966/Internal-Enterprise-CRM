from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth import router as auth_router
from app.database import engine, Base

# Models
from app.models.plan import SubscriptionPlan
from app.models.template import MessageTemplate
from app.models.client_site import ClientSite

# Routers
from app.api.plan import router as plan_router
from app.api.template import router as template_router
from app.api.client_site import router as client_site_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Internal Enterprise CRM",
    description="Unified CRM Platform for EduPulse and CloudMetric",
    version="1.0.0",
)

# CORS (React Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home
@app.get("/", tags=["Home"])
def home():
    return {
        "success": True,
        "message": "Internal Enterprise CRM API is Running",
        "version": "1.0.0"
    }

# Health Check
@app.get("/health", tags=["Health"])
def health():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "success": True,
            "database": "Connected",
            "status": "Healthy"
        }

    except Exception as e:
        return {
            "success": False,
            "database": "Failed",
            "error": str(e)
        }

# Register Routers
app.include_router(auth_router, prefix="/api/v1")
app.include_router(plan_router, prefix="/api/v1")
app.include_router(template_router, prefix="/api/v1")
app.include_router(client_site_router, prefix="/api/v1")
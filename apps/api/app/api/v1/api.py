from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, policies, evaluate, compliance, violations, dashboard, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(policies.router, prefix="/policies", tags=["policies"])
api_router.include_router(evaluate.router, prefix="/evaluate", tags=["evaluate"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
api_router.include_router(violations.router, prefix="/violations", tags=["violations"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])

from fastapi import APIRouter
from app.api.routes import auth, data, weather

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(data.router)
api_router.include_router(weather.router)
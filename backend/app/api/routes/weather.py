from fastapi import APIRouter, HTTPException
import httpx
from app.services.weather_service import fetch_weather, resolve_pincode

router = APIRouter(prefix="/weather", tags=["weather"])


@router.get("/pincode/{pin_code}")
async def weather_by_pincode(pin_code: str):
    try:
        location = await resolve_pincode(pin_code)
        weather = await fetch_weather(location["lat"], location["lon"], location["place"])
        return {**weather, "area": f"{location['place']}, {location['state']} ({pin_code})"}
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Weather providers unavailable") from exc
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
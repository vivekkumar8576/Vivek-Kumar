import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter(prefix="/data", tags=["data"])


@router.get("/crops")
def get_crops(
    season: str | None = Query(default=None),
    state: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    rows = db.query(models.Crop).all()
    payload = []
    for row in rows:
        item = {
            "id": row.slug,
            "name": row.name,
            "seasons": [entry.strip() for entry in row.seasons.split(",") if entry.strip()],
            "states": [entry.strip() for entry in row.states.split(",") if entry.strip()],
            "waterNeed": row.water_need,
            "durationDays": row.duration_days,
            "expectedYieldQtlPerAcre": row.expected_yield_qtl_per_acre,
            "advisory": row.advisory,
            "image": row.image,
        }
        if season and season not in item["seasons"]:
            continue
        if state and state not in item["states"]:
            continue
        payload.append(item)
    return payload


@router.get("/schemes")
def get_schemes(db: Session = Depends(get_db)):
    rows = db.query(models.Scheme).all()
    payload = []
    for row in rows:
        payload.append(
            {
                "id": row.slug,
                "title": row.title,
                "authority": row.authority,
                "support": row.support,
                "eligibility": row.eligibility,
                "timeline": row.timeline,
                "benefitAmount": row.benefit_amount,
                "requiredDocuments": json.loads(row.required_documents),
                "applySteps": json.loads(row.apply_steps),
                "officialPortal": row.official_portal,
                "helpline": row.helpline,
                "lastUpdated": row.last_updated,
            }
        )
    return payload


@router.get("/market-prices")
def get_market_prices(db: Session = Depends(get_db)):
    rows = db.query(models.MarketPrice).all()
    return [
        {
            "id": row.slug,
            "crop": row.crop,
            "market": row.market,
            "unit": row.unit,
            "min": row.min_price,
            "modal": row.modal_price,
            "max": row.max_price,
            "trend": row.trend,
        }
        for row in rows
    ]
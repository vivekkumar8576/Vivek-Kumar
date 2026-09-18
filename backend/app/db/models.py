from sqlalchemy import Integer, String, Text, DateTime, Float, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(190), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    state: Mapped[str] = mapped_column(String(120), nullable=False)
    pin_code: Mapped[str] = mapped_column(String(6), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())


class Crop(Base):
    __tablename__ = "crops"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    seasons: Mapped[str] = mapped_column(String(120))
    states: Mapped[str] = mapped_column(Text)
    water_need: Mapped[str] = mapped_column(String(20))
    duration_days: Mapped[int] = mapped_column(Integer)
    expected_yield_qtl_per_acre: Mapped[int] = mapped_column(Integer)
    advisory: Mapped[str] = mapped_column(Text)
    image: Mapped[str] = mapped_column(Text)


class Scheme(Base):
    __tablename__ = "schemes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(180))
    authority: Mapped[str] = mapped_column(String(180))
    support: Mapped[str] = mapped_column(Text)
    eligibility: Mapped[str] = mapped_column(Text)
    timeline: Mapped[str] = mapped_column(String(120))
    benefit_amount: Mapped[str] = mapped_column(String(255))
    required_documents: Mapped[str] = mapped_column(Text)
    apply_steps: Mapped[str] = mapped_column(Text)
    official_portal: Mapped[str] = mapped_column(String(255))
    helpline: Mapped[str] = mapped_column(String(120))
    last_updated: Mapped[str] = mapped_column(String(80))


class MarketPrice(Base):
    __tablename__ = "market_prices"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    crop: Mapped[str] = mapped_column(String(120))
    market: Mapped[str] = mapped_column(String(120))
    unit: Mapped[str] = mapped_column(String(20))
    min_price: Mapped[float] = mapped_column(Float)
    modal_price: Mapped[float] = mapped_column(Float)
    max_price: Mapped[float] = mapped_column(Float)
    trend: Mapped[str] = mapped_column(String(20))
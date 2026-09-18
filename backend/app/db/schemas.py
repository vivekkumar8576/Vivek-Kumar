from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=120)
    state: str = Field(min_length=2, max_length=120)
    pin_code: str = Field(pattern=r"^\d{6}$")


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=120)


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    state: str
    pin_code: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class CropOut(BaseModel):
    id: str
    name: str
    seasons: list[str]
    states: list[str]
    waterNeed: str
    durationDays: int
    expectedYieldQtlPerAcre: int
    advisory: str
    image: str


class SchemeOut(BaseModel):
    id: str
    title: str
    authority: str
    support: str
    eligibility: str
    timeline: str
    benefitAmount: str
    requiredDocuments: list[str]
    applySteps: list[str]
    officialPortal: str
    helpline: str
    lastUpdated: str


class MarketPriceOut(BaseModel):
    id: str
    crop: str
    market: str
    unit: str
    min: float
    modal: float
    max: float
    trend: str


class WeatherOut(BaseModel):
    place: str
    temperature: int
    humidity: int
    windSpeed: int
    precipitation: float
    condition: str
    code: int
    area: str
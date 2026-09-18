import httpx

WEATHER_CODE_TEXT = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Rain showers",
    95: "Thunderstorm",
}


async def resolve_pincode(pin_code: str):
    async with httpx.AsyncClient(timeout=12.0) as client:
        response = await client.get(f"https://api.zippopotam.us/in/{pin_code}")
        response.raise_for_status()
        payload = response.json()
        place = payload["places"][0]
        return {
            "place": place["place name"],
            "state": place["state"],
            "lat": float(place["latitude"]),
            "lon": float(place["longitude"]),
        }


async def fetch_weather(lat: float, lon: float, place: str):
    endpoint = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code",
        "timezone": "auto",
    }

    async with httpx.AsyncClient(timeout=12.0) as client:
        response = await client.get(endpoint, params=params)
        response.raise_for_status()
        current = response.json().get("current", {})

    code = int(current.get("weather_code", 0))
    return {
        "place": place,
        "temperature": round(current.get("temperature_2m", 0)),
        "humidity": int(current.get("relative_humidity_2m", 0)),
        "windSpeed": round(current.get("wind_speed_10m", 0)),
        "precipitation": float(current.get("precipitation", 0)),
        "condition": WEATHER_CODE_TEXT.get(code, "Field-ready weather"),
        "code": code,
    }
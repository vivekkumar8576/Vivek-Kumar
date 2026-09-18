import { WeatherSnapshot } from "@/types";

const weatherCodeToText: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Violent showers",
  95: "Thunderstorm",
};

type RawWeatherResponse = {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    precipitation: number;
    weather_code: number;
  };
};

type ZippopotamPlace = {
  "place name": string;
  state: string;
  latitude: string;
  longitude: string;
};

type ZippopotamResponse = {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: ZippopotamPlace[];
};

export type PinLocation = {
  pinCode: string;
  place: string;
  state: string;
  latitude: number;
  longitude: number;
};

export const fetchWeather = async (
  lat: number,
  lon: number,
  place: string,
): Promise<WeatherSnapshot> => {
  const endpoint = new URL("https://api.open-meteo.com/v1/forecast");
  endpoint.searchParams.set("latitude", String(lat));
  endpoint.searchParams.set("longitude", String(lon));
  endpoint.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code",
  );
  endpoint.searchParams.set("timezone", "auto");

  const response = await fetch(endpoint.toString());
  if (!response.ok) {
    throw new Error("Weather service unavailable.");
  }

  const data = (await response.json()) as RawWeatherResponse;
  if (!data.current) {
    throw new Error("Weather data missing.");
  }

  return {
    place,
    temperature: Math.round(data.current.temperature_2m),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    precipitation: data.current.precipitation,
    code: data.current.weather_code,
    condition: weatherCodeToText[data.current.weather_code] ?? "Field-ready weather",
  };
};

export const resolveIndianPinCode = async (pinCode: string): Promise<PinLocation> => {
  const cleanedPin = pinCode.trim();
  if (!/^\d{6}$/.test(cleanedPin)) {
    throw new Error("Invalid pin code.");
  }

  const response = await fetch(`https://api.zippopotam.us/in/${cleanedPin}`);
  if (!response.ok) {
    throw new Error("Pin code not found.");
  }

  const data = (await response.json()) as ZippopotamResponse;
  const primaryPlace = data.places?.[0];
  if (!primaryPlace) {
    throw new Error("No location mapped to this pin code.");
  }

  return {
    pinCode: cleanedPin,
    place: primaryPlace["place name"],
    state: primaryPlace.state,
    latitude: Number(primaryPlace.latitude),
    longitude: Number(primaryPlace.longitude),
  };
};
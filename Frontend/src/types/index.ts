export type Season = "Kharif" | "Rabi" | "Zaid";

export type Trend = "up" | "down" | "stable";

export type Crop = {
  id: string;
  name: string;
  seasons: Season[];
  states: string[];
  waterNeed: "Low" | "Moderate" | "High";
  durationDays: number;
  expectedYieldQtlPerAcre: number;
  advisory: string;
  image: string;
};

export type Scheme = {
  id: string;
  title: string;
  authority: string;
  support: string;
  eligibility: string;
  timeline: string;
  benefitAmount: string;
  requiredDocuments: string[];
  applySteps: string[];
  officialPortal: string;
  helpline: string;
  lastUpdated: string;
};

export type MarketPrice = {
  id: string;
  crop: string;
  market: string;
  unit: "Quintal" | "Kg";
  min: number;
  modal: number;
  max: number;
  trend: Trend;
};

export type AppUser = {
  id: number;
  name: string;
  email: string;
  state: string;
  pinCode: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  pinCode: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    state: string;
    pin_code: string;
  };
};

export type LoginInput = {
  email: string;
  password: string;
};

export type WeatherSnapshot = {
  place: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
  code: number;
};
import { AuthResponse, LoginInput, RegisterInput } from "@/types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const payload = (await response.json()) as { detail?: string; error?: string };
      message = payload.detail ?? payload.error ?? message;
    } catch {
      message = await response.text();
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
};

export const api = {
  register: (payload: RegisterInput) =>
    request<AuthResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        state: payload.state,
        pin_code: payload.pinCode,
      }),
    }),

  login: (payload: LoginInput) =>
    request<AuthResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: (token: string) =>
    request<AuthResponse["user"]>("/api/v1/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  crops: (season?: string, state?: string) => {
    const query = new URLSearchParams();
    if (season) query.set("season", season);
    if (state) query.set("state", state);
    const suffix = query.toString() ? `?${query.toString()}` : "";
    return request("/api/v1/data/crops" + suffix);
  },

  schemes: () => request("/api/v1/data/schemes"),
  marketPrices: () => request("/api/v1/data/market-prices"),
  weatherByPinCode: (pinCode: string) => request(`/api/v1/weather/pincode/${pinCode}`),
};

export { API_BASE_URL };
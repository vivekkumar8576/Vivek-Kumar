import { CloudRain, Droplet, Wind } from "reicon-react";
import { WeatherSnapshot } from "@/types";

type Props = {
  weather: WeatherSnapshot | null;
  loading: boolean;
  error: string;
  area: string;
};

export const WeatherPanel = ({ weather, loading, error, area }: Props) => {
  if (loading) {
    return <p className="text-sm text-[var(--ink-muted)]">Loading weather from Open-Meteo...</p>;
  }

  if (error) {
    return <p className="text-sm text-[var(--tone-warn)]">{error}</p>;
  }

  if (!weather) {
    return <p className="text-sm text-[var(--ink-muted)]">Weather data unavailable.</p>;
  }

  return (
    <div id="weather" className="grid gap-3 border border-[var(--line-soft)] bg-[var(--surface-base)] p-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div className="border-b border-[var(--line-soft)] pb-3 md:border-b-0 md:pb-0">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--ink-muted)]">Live Weather</p>
        <p className="mt-1 text-xl font-semibold text-[var(--ink-strong)]">{weather.temperature} deg C</p>
        <p className="text-sm text-[var(--ink-muted)]">
          {area || weather.place} • {weather.condition}
        </p>
      </div>
      <div className="weather-item">
        <Droplet size={16} />
        Humidity {weather.humidity}%
      </div>
      <div className="weather-item">
        <CloudRain size={16} />
        Precipitation {weather.precipitation} mm
      </div>
      <div className="weather-item">
        <Wind size={16} />
        Wind {weather.windSpeed} km/h
      </div>
    </div>
  );
};
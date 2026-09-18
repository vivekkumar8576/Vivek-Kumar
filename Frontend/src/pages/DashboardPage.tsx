import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChartBar, Droplet, Feather, Shield4 } from "reicon-react";
import { seasons, states } from "@/data/sitedata";
import { TopNav } from "@/components/dashboard/TopNav";
import { SectionHeading } from "@/components/dashboard/SectionHeading";
import { CropsGrid } from "@/components/dashboard/CropsGrid";
import { SchemesList } from "@/components/dashboard/SchemesList";
import { PricesTable } from "@/components/dashboard/PricesTable";
import { WeatherPanel } from "@/components/dashboard/WeatherPanel";
import { SchemeDetailsModal } from "@/components/dashboard/SchemeDetailsModal";
import { useAuth } from "@/context/AuthContext";
import { Crop, MarketPrice, Scheme, Season, WeatherSnapshot } from "@/types";
import { api } from "@/services/api";

const heroImage =
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=80";

const fluctuatePrices = (rows: MarketPrice[]): MarketPrice[] =>
  rows.map((row) => {
    if (Math.random() > 0.35) return row;
    const swing = 1 + (Math.random() * 0.04 - 0.02);
    const modal = Number((row.modal * swing).toFixed(row.unit === "Kg" ? 2 : 0));
    const min = Number((modal * 0.93).toFixed(row.unit === "Kg" ? 2 : 0));
    const max = Number((modal * 1.07).toFixed(row.unit === "Kg" ? 2 : 0));
    const trend: MarketPrice["trend"] = modal > row.modal ? "up" : modal < row.modal ? "down" : "stable";
    return {
      ...row,
      modal,
      min,
      max,
      trend,
    };
  });

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [selectedState, setSelectedState] = useState(user?.state ?? "Maharashtra");
  const [selectedSeason, setSelectedSeason] = useState<Season>("Kharif");
  const [cropsData, setCropsData] = useState<Crop[]>([]);
  const [schemesData, setSchemesData] = useState<Scheme[]>([]);
  const [liveMarket, setLiveMarket] = useState<MarketPrice[]>([]);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [weatherArea, setWeatherArea] = useState("");
  const [activeScheme, setActiveScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cropsPayload, schemesPayload, marketPayload] = await Promise.all([
          api.crops(selectedSeason, selectedState),
          api.schemes(),
          api.marketPrices(),
        ]);
        setCropsData(cropsPayload as Crop[]);
        setSchemesData(schemesPayload as Scheme[]);
        setLiveMarket(marketPayload as MarketPrice[]);
      } catch {
        setCropsData([]);
        setSchemesData([]);
        setLiveMarket([]);
      }
    };

    void loadData();
  }, [selectedSeason, selectedState]);

  useEffect(() => {
    if (liveMarket.length === 0) return;
    const timer = window.setInterval(() => {
      setLiveMarket((previous) => fluctuatePrices(previous));
    }, 5500);
    return () => window.clearInterval(timer);
  }, [liveMarket.length]);

  useEffect(() => {
    if (!user) return;
    setWeatherLoading(true);
    setWeatherError("");

    api
      .weatherByPinCode(user.pinCode)
      .then((payload) => {
        const data = payload as WeatherSnapshot & { area: string };
        setWeatherArea(data.area);
        setWeather(data);
      })
      .catch(() => setWeatherError("Could not fetch weather right now. Please refresh."))
      .finally(() => setWeatherLoading(false));
  }, [user]);

  const cropMatches = useMemo(() => cropsData, [cropsData]);

  const avgPrice = useMemo(() => {
    if (liveMarket.length === 0) return 0;
    const total = liveMarket.reduce((sum, item) => sum + item.modal, 0);
    return Math.round(total / liveMarket.length);
  }, [liveMarket]);

  const stats = [
    { label: "Seasonal Matches", value: cropMatches.length, icon: <Feather size={17} /> },
    { label: "Active Schemes", value: schemesData.length, icon: <Shield4 size={17} /> },
    { label: "Average Modal Price", value: `INR ${avgPrice}`, icon: <ChartBar size={17} /> },
    {
      label: "High Water Crops",
      value: cropMatches.filter((item) => item.waterNeed === "High").length,
      icon: <Droplet size={17} />,
    },
  ];

  if (!user) return null;

  return (
    <div className="bg-[var(--surface-canvas)] text-[var(--ink-strong)]">
      <TopNav user={user} onLogout={logout} />

      <section className="relative overflow-hidden">
        <img src={heroImage} alt="Healthy crops in golden light" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(104deg,oklch(0.18_0.03_150/0.91),oklch(0.27_0.04_150/0.67),transparent)]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl space-y-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/80">Planner Dashboard</p>
            <h1 className="font-display text-[clamp(2rem,4.8vw,3.7rem)] leading-[1.03]">
              {user.name}, stay ahead this {selectedSeason} with grounded field signals.
            </h1>
            <p className="text-sm text-white/85 md:text-base">
              Track weather, market movement, and practical crop choices for {selectedState}.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:space-y-12">
        <WeatherPanel weather={weather} loading={weatherLoading} error={weatherError} area={weatherArea} />

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.22, delay: index * 0.03 }}
              className="flex items-start justify-between border border-[var(--line-soft)] bg-[var(--surface-base)] px-4 py-4"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--ink-muted)]">{stat.label}</p>
                <p className="mt-2 text-xl font-semibold">{stat.value}</p>
              </div>
              <span className="text-[var(--tone-leaf)]">{stat.icon}</span>
            </motion.div>
          ))}
        </section>

        <section id="crops" className="space-y-6 border-t border-[var(--line-soft)] pt-8">
          <SectionHeading
            title="Seasonal Crop Suggestions"
            subtitle="Filtered to your selected state and season with realistic field advisories."
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`filter-chip ${season === selectedSeason ? "filter-chip--active" : ""}`}
              >
                {season}
              </button>
            ))}

            <div className="sm:ml-auto sm:w-56">
              <select
                value={selectedState}
                onChange={(event) => setSelectedState(event.target.value)}
                className="input-field bg-[var(--surface-base)]"
              >
                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <CropsGrid items={cropMatches} />
        </section>

        <section id="schemes" className="space-y-6 border-t border-[var(--line-soft)] pt-8">
          <SectionHeading
            title="Government Schemes"
            subtitle="Quickly scan support programs that matter during planning and input cycles."
          />
          <SchemesList items={schemesData} onOpenDetails={setActiveScheme} />
        </section>

        <section id="prices" className="space-y-6 border-t border-[var(--line-soft)] pt-8">
          <SectionHeading
            title="Current Crop Market Prices"
            subtitle="Simulated real-time shifts across major mandis to reflect live market rhythm."
          />
          <PricesTable rows={liveMarket} />
        </section>

      </main>

      <footer className="border-t border-[var(--line-soft)] bg-[var(--surface-base)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-7 text-sm text-[var(--ink-muted)] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>KrishiVani helps farmers take season-ready decisions with less uncertainty.</p>
          <p>Weather source: Open-Meteo (free public API).</p>
        </div>
      </footer>

      <SchemeDetailsModal scheme={activeScheme} onClose={() => setActiveScheme(null)} />
    </div>
  );
};
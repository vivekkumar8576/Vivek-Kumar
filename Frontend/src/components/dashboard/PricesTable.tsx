import { AnimatePresence, motion } from "framer-motion";
import { ChartBar, TrendDown, TrendUp } from "reicon-react";
import { MarketPrice } from "@/types";

export const PricesTable = ({ rows }: { rows: MarketPrice[] }) => (
  <div className="overflow-x-auto border border-[var(--line-soft)] bg-[var(--surface-base)]">
    <table className="min-w-full text-left text-sm">
      <thead className="border-b border-[var(--line-soft)] bg-[var(--surface-cream)]">
        <tr>
          <th className="px-4 py-3 font-semibold">Crop</th>
          <th className="px-4 py-3 font-semibold">Market</th>
          <th className="px-4 py-3 font-semibold">Min</th>
          <th className="px-4 py-3 font-semibold">Modal</th>
          <th className="px-4 py-3 font-semibold">Max</th>
          <th className="px-4 py-3 font-semibold">Trend</th>
        </tr>
      </thead>
      <tbody>
        <AnimatePresence initial={false}>
          {rows.map((price) => (
            <motion.tr
              key={price.id}
              layout
              transition={{ duration: 0.28 }}
              className="border-b border-[var(--line-soft)]"
            >
              <td className="px-4 py-3 font-medium text-[var(--ink-strong)]">{price.crop}</td>
              <td className="px-4 py-3 text-[var(--ink-muted)]">{price.market}</td>
              <td className="px-4 py-3 text-[var(--ink-muted)]">INR {price.min}/{price.unit}</td>
              <td className="px-4 py-3 font-semibold text-[var(--ink-strong)]">INR {price.modal}/{price.unit}</td>
              <td className="px-4 py-3 text-[var(--ink-muted)]">INR {price.max}/{price.unit}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ink-strong)]">
                  {price.trend === "up" && <TrendUp size={14} className="text-[var(--tone-leaf)]" />}
                  {price.trend === "down" && <TrendDown size={14} className="text-[var(--tone-warn)]" />}
                  {price.trend === "stable" && <ChartBar size={14} className="text-[var(--ink-muted)]" />}
                  {price.trend}
                </span>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </div>
);
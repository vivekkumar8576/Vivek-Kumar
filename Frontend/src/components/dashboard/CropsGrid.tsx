import { motion } from "framer-motion";
import { Crop } from "@/types";

export const CropsGrid = ({ items }: { items: Crop[] }) => {
  if (items.length === 0) {
    return (
      <p className="border border-[var(--line-soft)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--ink-muted)]">
        No crop match for this state-season combination. Try a nearby state or another season.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((crop) => (
        <motion.article
          key={crop.id}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border border-[var(--line-soft)] bg-[var(--surface-base)]"
        >
          <img src={crop.image} alt={crop.name} className="h-44 w-full object-cover" loading="lazy" />
          <div className="space-y-2 p-4">
            <div className="flex items-end justify-between gap-2">
              <h3 className="text-lg font-semibold text-[var(--ink-strong)]">{crop.name}</h3>
              <span className="text-xs text-[var(--ink-muted)]">{crop.durationDays} days</span>
            </div>
            <p className="text-sm text-[var(--ink-muted)]">{crop.advisory}</p>
            <div className="flex justify-between text-sm text-[var(--ink-muted)]">
              <span>Water: {crop.waterNeed}</span>
              <span>{crop.expectedYieldQtlPerAcre} qtl/acre</span>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};
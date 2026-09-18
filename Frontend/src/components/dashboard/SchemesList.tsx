import { motion } from "framer-motion";
import { ArrowUpRight } from "reicon-react";
import { Scheme } from "@/types";

export const SchemesList = ({
  items,
  onOpenDetails,
}: {
  items: Scheme[];
  onOpenDetails: (scheme: Scheme) => void;
}) => (
  <div className="grid gap-4 md:grid-cols-2">
    {items.map((scheme) => (
      <motion.article
        key={scheme.id}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.25 }}
        className="space-y-3 border border-[var(--line-soft)] bg-[var(--surface-base)] p-5"
      >
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">{scheme.authority}</p>
        <h3 className="text-lg font-semibold text-[var(--ink-strong)]">{scheme.title}</h3>
        <p className="text-sm text-[var(--ink-muted)]">{scheme.support}</p>
        <div className="flex items-center justify-between border-t border-[var(--line-soft)] pt-3 text-sm">
          <span className="text-[var(--ink-muted)]">{scheme.timeline}</span>
          <button
            onClick={() => onOpenDetails(scheme)}
            className="inline-flex items-center gap-1 text-[var(--tone-leaf)] hover:underline"
          >
            Scheme details <ArrowUpRight size={15} />
          </button>
        </div>
      </motion.article>
    ))}
  </div>
);
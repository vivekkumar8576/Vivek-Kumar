import { AnimatePresence, motion } from "framer-motion";
import { CloseCircle, Shield4 } from "reicon-react";
import { Scheme } from "@/types";

type Props = {
  scheme: Scheme | null;
  onClose: () => void;
};

export const SchemeDetailsModal = ({ scheme, onClose }: Props) => (
  <AnimatePresence>
    {scheme && (
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center bg-[color:oklch(0.16_0.03_150/0.62)] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg border border-[var(--line-soft)] bg-[var(--surface-base)] p-6"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                <Shield4 size={14} /> Official Scheme
              </p>
              <h3 className="text-xl font-semibold leading-tight text-[var(--ink-strong)]">{scheme.title}</h3>
              <p className="text-sm text-[var(--ink-muted)]">{scheme.authority}</p>
            </div>
            <button onClick={onClose} className="ghost-button" aria-label="Close">
              <CloseCircle size={15} />
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Support</p>
              <p className="text-[var(--ink-strong)]">{scheme.support}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Benefit Amount</p>
              <p className="text-[var(--ink-strong)]">{scheme.benefitAmount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Eligibility</p>
              <p className="text-[var(--ink-strong)]">{scheme.eligibility}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Application Window</p>
              <p className="text-[var(--ink-strong)]">{scheme.timeline}</p>
            </div>

            <div className="grid gap-4 border-t border-[var(--line-soft)] pt-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Helpline</p>
                <p className="text-[var(--ink-strong)]">{scheme.helpline}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Last Updated</p>
                <p className="text-[var(--ink-strong)]">{scheme.lastUpdated}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-[var(--line-soft)] pt-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">Required Documents</p>
              <ul className="space-y-1 text-[var(--ink-strong)]">
                {scheme.requiredDocuments.map((doc) => (
                  <li key={doc}>- {doc}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 border-t border-[var(--line-soft)] pt-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">How To Apply</p>
              <ol className="space-y-1 text-[var(--ink-strong)]">
                {scheme.applySteps.map((step, index) => (
                  <li key={step}>{index + 1}. {step}</li>
                ))}
              </ol>
            </div>

            <div className="border-t border-[var(--line-soft)] pt-4">
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[var(--tone-leaf)] underline-offset-4 hover:underline"
              >
                Visit official portal
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
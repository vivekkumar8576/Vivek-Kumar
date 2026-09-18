export const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="space-y-2">
    <h2 className="text-[clamp(1.25rem,2vw,1.9rem)] font-semibold tracking-tight text-[var(--ink-strong)]">{title}</h2>
    <p className="max-w-2xl text-sm text-[var(--ink-muted)] md:text-base">{subtitle}</p>
  </div>
);
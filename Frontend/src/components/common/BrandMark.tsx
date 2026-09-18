export const BrandMark = ({ invert = false }: { invert?: boolean }) => (
  <div className="flex items-center gap-3">
    <span
      className={`inline-flex h-11 w-11 items-center justify-center border ${
        invert ? "border-white/35 bg-white/10" : "border-[var(--line-soft)] bg-[var(--surface-base)]"
      }`}
    >
      <svg
        viewBox="0 0 200 200"
        className={`${invert ? "text-white" : "text-[var(--tone-leaf)]"} h-6 w-6`}
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M100 170V85" />
        <path d="M100 125C77 124 61 110 61 88C83 89 99 102 100 125Z" />
        <path d="M100 105C102 82 118 67 140 67C139 89 124 104 100 105Z" />
        <path d="M45 170H155" />
        <path d="M65 170L72 158" strokeWidth="6" />
        <path d="M128 170L135 158" strokeWidth="6" />
      </svg>
    </span>
    <p className={`font-display text-xl tracking-tight ${invert ? "text-white" : "text-[var(--ink-strong)]"}`}>
      KrishiVani
    </p>
  </div>
);
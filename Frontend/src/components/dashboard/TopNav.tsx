import { ProfileCircle, Logout2 } from "reicon-react";
import { AppUser } from "@/types";
import { navLinks } from "@/data/sitedata";
import { BrandMark } from "@/components/common/BrandMark";

type Props = {
  user: AppUser;
  onLogout: () => void;
};

export const TopNav = ({ user, onLogout }: Props) => (
  <header className="sticky top-0 z-30 border-b border-[var(--line-soft)] bg-[color:oklch(0.98_0.014_100/0.95)] backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <BrandMark />

      <nav className="hidden items-center gap-6 text-sm text-[var(--ink-muted)] md:flex">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="transition hover:text-[var(--ink-strong)]">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 text-sm text-[var(--ink-muted)] sm:flex">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-cream)] text-[var(--ink-strong)]">
            <ProfileCircle size={15} />
          </span>
          <span>{user.name}</span>
        </div>
        <button className="ghost-button flex items-center gap-1 text-sm font-medium" onClick={onLogout}>
          <Logout2 size={15} /> Logout
        </button>
      </div>
    </div>

    <nav className="border-t border-[var(--line-soft)] md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="filter-chip whitespace-nowrap">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  </header>
);
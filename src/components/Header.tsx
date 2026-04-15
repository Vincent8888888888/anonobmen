import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/about", label: "О нас" },
  { to: "/guarantees", label: "Гарантии" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-green-purple-text">AnonObmen24</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-primary transition-colors" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://t.me/Anon_obmen24"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-neon-green-dim"
          >
            Telegram
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-muted-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "block rounded-md px-3 py-2.5 text-sm text-primary" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://t.me/Anon_obmen24"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            Написать в Telegram
          </a>
        </nav>
      )}
    </header>
  );
}

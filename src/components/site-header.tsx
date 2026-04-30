import { Link } from "@tanstack/react-router";
import { Phone, Search, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/" },
  { label: "About Us", to: "/" },
  { label: "FAQs", to: "/" },
  { label: "Contact Us", to: "/" },
  { label: "Join Us", to: "/" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-end gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium tracking-wide">02-626-8100</span>
            <span className="opacity-60">|</span>
            <span className="font-medium tracking-wide">02-876-7200</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="font-semibold opacity-90 hover:opacity-100">TH</button>
            <span className="opacity-50">|</span>
            <button className="font-semibold">EN</button>
          </div>
        </div>
      </div>

      {/* main bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-foreground">ICBC</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-black">工</span>
              <span className="hidden sm:inline text-lg font-bold text-foreground">工银泰国</span>
              <span className="hidden md:inline text-xs text-muted-foreground">(租赁)</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n, i) => (
              <Link
                key={n.label}
                to={n.to}
                className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-primary ${
                  i === 0 ? "text-primary" : "text-foreground/80"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.18_150)] px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-110 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Chat via LINE
            </a>
            <button className="hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md border border-border"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-4 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className="px-3 py-3 rounded-md text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
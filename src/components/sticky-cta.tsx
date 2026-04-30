import { useEffect, useState } from "react";
import { Calculator, FileCheck, MessageCircle } from "lucide-react";

export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-30 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="bg-card border border-border shadow-[var(--shadow-elevated)] rounded-xl p-2 grid grid-cols-3 gap-2">
          <a
            href="#calculator"
            className="flex items-center justify-center gap-2 h-11 rounded-lg text-xs font-bold uppercase tracking-wider text-foreground/80 hover:bg-muted transition"
          >
            <Calculator className="h-4 w-4" /> <span className="hidden sm:inline">Calculate</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-center gap-2 h-11 rounded-lg bg-[oklch(0.7_0.18_150)] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition"
          >
            <MessageCircle className="h-4 w-4" /> <span className="hidden sm:inline">LINE</span>
          </a>
          <a
            href="#apply"
            className="flex items-center justify-center gap-2 h-11 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
          >
            <FileCheck className="h-4 w-4" /> Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
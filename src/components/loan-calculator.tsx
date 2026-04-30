import { useMemo, useState } from "react";
import { ArrowRight, Phone, Mail } from "lucide-react";

function formatTHB(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function Slider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative pt-2">
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-2 border-background shadow-md pointer-events-none"
        style={{ left: `calc(${pct}% - 8px)` }}
      />
    </div>
  );
}

export function LoanCalculator() {
  const [amount, setAmount] = useState(1_000_000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(7.03);
  const [budgetMode, setBudgetMode] = useState(false);
  const [budget, setBudget] = useState(20000);

  const calc = useMemo(() => {
    const r = rate / 100 / 12;
    if (budgetMode) {
      // derive amount from monthly budget
      const principal = budget * ((1 - Math.pow(1 + r, -term)) / r);
      const total = budget * term;
      return {
        monthly: budget,
        principal,
        totalInterest: total - principal,
        totalPayment: total,
      };
    }
    const monthly = (amount * r) / (1 - Math.pow(1 + r, -term));
    const totalPayment = monthly * term;
    return {
      monthly,
      principal: amount,
      totalInterest: totalPayment - amount,
      totalPayment,
    };
  }, [amount, term, rate, budgetMode, budget]);

  // comparison alt term
  const altTerm = term === 60 ? 48 : 60;
  const altMonthly = useMemo(() => {
    const r = rate / 100 / 12;
    return (amount * r) / (1 - Math.pow(1 + r, -altTerm));
  }, [amount, altTerm, rate]);

  return (
    <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-elevated)] border border-border w-full">
      <div className="flex items-start justify-between gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          Calculate your monthly payment
        </h3>
        <span className="hidden sm:inline-flex shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-accent text-accent-foreground">
          Live
        </span>
      </div>

      {/* mode toggle */}
      <div className="flex p-1 bg-muted rounded-lg mb-6 text-xs font-semibold">
        <button
          onClick={() => setBudgetMode(false)}
          className={`flex-1 py-2 rounded-md transition ${
            !budgetMode ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
          }`}
        >
          By loan amount
        </button>
        <button
          onClick={() => setBudgetMode(true)}
          className={`flex-1 py-2 rounded-md transition ${
            budgetMode ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
          }`}
        >
          I know my budget
        </button>
      </div>

      <div className="space-y-5">
        {!budgetMode ? (
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className="text-sm font-medium text-foreground/80">Loan Amount</label>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-primary">{formatTHB(amount)}</span>
                <span className="text-xs text-muted-foreground">THB</span>
              </div>
            </div>
            <Slider value={amount} min={100_000} max={10_000_000} step={50_000} onChange={setAmount} />
            <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
              <span>100,000</span>
              <span>10,000,000</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <label className="text-sm font-medium text-foreground/80">Monthly Budget</label>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-primary">{formatTHB(budget)}</span>
                <span className="text-xs text-muted-foreground">THB</span>
              </div>
            </div>
            <Slider value={budget} min={3000} max={150_000} step={500} onChange={setBudget} />
            <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
              <span>3,000</span>
              <span>150,000</span>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-baseline justify-between mb-1">
            <label className="text-sm font-medium text-foreground/80">Loan Term</label>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-primary">{term}</span>
              <span className="text-xs text-muted-foreground">Months</span>
            </div>
          </div>
          <Slider value={term} min={12} max={84} step={6} onChange={setTerm} />
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
            <span>12</span>
            <span>84</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1">
            <label className="text-sm font-medium text-foreground/80">Interest Rate (p.a.)</label>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-primary">{rate.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </div>
          <Slider value={rate} min={7.03} max={14.69} step={0.01} onChange={setRate} />
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
            <span>7.03%</span>
            <span>14.69%</span>
          </div>
        </div>
      </div>

      {/* result */}
      <div className="mt-6 rounded-xl bg-muted/60 border border-border p-5">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Estimated Monthly Payment
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
                {formatTHB(calc.monthly)}
              </span>
              <span className="text-sm font-medium text-muted-foreground">THB</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="text-right font-semibold text-foreground">
              {formatTHB(calc.totalInterest)} THB
            </span>
            <span className="text-muted-foreground">Total Payment</span>
            <span className="text-right font-semibold text-foreground">
              {formatTHB(calc.totalPayment)} THB
            </span>
            {!budgetMode && (
              <>
                <span className="text-muted-foreground">{altTerm} months</span>
                <span className="text-right font-semibold text-foreground/70">
                  {formatTHB(altMonthly)} /mo
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="#apply"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
        >
          Apply Now <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border-2 border-primary text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition"
        >
          Contact Us <Phone className="h-4 w-4" />
        </a>
      </div>
      <button className="mt-3 w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-foreground/70 hover:text-primary transition">
        <Mail className="h-3.5 w-3.5" /> Send me this quote via email or LINE
      </button>

      <p className="mt-4 text-[11px] text-muted-foreground text-center">
        No obligation · Secure & confidential · Estimate for reference only
      </p>
    </div>
  );
}
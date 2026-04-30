import { useState } from "react";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";

const questions = [
  {
    key: "employment",
    label: "Employment status",
    options: ["Salaried employee", "Self-employed", "Business owner", "Other"],
  },
  {
    key: "income",
    label: "Monthly income range (THB)",
    options: ["Under 20,000", "20,000 – 50,000", "50,000 – 100,000", "Over 100,000"],
  },
  {
    key: "loans",
    label: "Existing loan obligations",
    options: ["None", "Less than 30% of income", "30–50% of income", "Over 50%"],
  },
  {
    key: "purpose",
    label: "What are you financing?",
    options: ["Auto", "Business", "Solar", "Other"],
  },
] as const;

export function Prequalification() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= questions.length;

  const eligible = answers["loans"] !== "Over 50%" && answers["income"] !== "Under 20,000";

  function pick(option: string) {
    setAnswers({ ...answers, [questions[step].key]: option });
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  return (
    <section className="py-20 bg-muted/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Pre-qualification
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
            Check your eligibility in <span className="text-primary">60 seconds</span>
          </h2>
          <p className="mt-4 text-foreground/70 text-lg max-w-md">
            Answer a few quick questions to see if you qualify — no impact on your credit score, no commitment.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Instant indicative result",
              "Anonymous — no personal data required",
              "Speak directly with an advisor if you prefer",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-8">
          {!done ? (
            <>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Step {step + 1} of {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${
                        i <= step ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-5">
                {questions[step].label}
              </h3>
              <div className="grid gap-2">
                {questions[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => pick(opt)}
                    className="text-left px-4 py-4 rounded-lg border border-border bg-background hover:border-primary hover:bg-accent transition group flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-foreground">{opt}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div
                className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
                  eligible ? "bg-[oklch(0.95_0.05_150)]" : "bg-accent"
                }`}
              >
                <CheckCircle2
                  className={`h-8 w-8 ${eligible ? "text-[oklch(0.55_0.15_150)]" : "text-primary"}`}
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {eligible ? "You are likely eligible" : "Let's talk to an advisor"}
              </h3>
              <p className="mt-2 text-sm text-foreground/70 max-w-sm mx-auto">
                {eligible
                  ? "Based on your answers, you appear to meet our basic criteria. Continue your application to get a tailored offer."
                  : "Your situation may need a personalised review. Our advisors can help you find the right solution."}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
                >
                  {eligible ? "Continue application" : "Chat with advisor"}
                  {eligible ? <ArrowRight className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md border border-border text-sm font-semibold text-foreground/70 hover:bg-muted transition"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, CheckCircle2, Clock, AlertCircle, FileText,
  PhoneCall, XCircle, Phone, Mail, MessageCircle, ArrowLeft, ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/status")({
  component: StatusPage,
});

type StatusKey = "submitted" | "review" | "docs" | "approved" | "contact" | "rejected";

interface StatusConfig {
  label: string;
  description: string;
  badgeClass: string;
  icon: React.ReactNode;
  nextSteps: string[];
}

const CONFIGS: Record<StatusKey, StatusConfig> = {
  submitted: {
    label: "Submitted",
    description: "Your application has been received and is queued for review. Our team will begin processing it shortly.",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Clock className="w-8 h-8 text-blue-600" />,
    nextSteps: [
      "No action required at this time.",
      "You will be notified via your preferred contact method once review begins.",
      "Expected review start: within 1 business day.",
    ],
  },
  review: {
    label: "Under Review",
    description: "Our team is currently reviewing your application and the documents you submitted.",
    badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: <Search className="w-8 h-8 text-yellow-600" />,
    nextSteps: [
      "Please keep your mobile phone available in case an advisor needs to reach you.",
      "Ensure your email inbox is not full.",
      "Expected completion: within 2–3 business days.",
    ],
  },
  docs: {
    label: "Documents Required",
    description: "Additional documents are needed before we can continue processing your application.",
    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
    icon: <FileText className="w-8 h-8 text-orange-600" />,
    nextSteps: [
      "Upload the required documents as soon as possible to avoid delays.",
      "Contact our team if you need guidance on accepted document formats.",
      "Your application will resume review once documents are received.",
    ],
  },
  approved: {
    label: "Approved in Principle",
    description: "Congratulations! Your application has been approved in principle, subject to final verification and documentation.",
    badgeClass: "bg-green-100 text-green-800 border-green-200",
    icon: <CheckCircle2 className="w-8 h-8 text-green-600" />,
    nextSteps: [
      "An advisor will contact you to confirm final terms and conditions.",
      "Please have your original documents ready for verification.",
      "Expected contact: within 1 business day.",
    ],
  },
  contact: {
    label: "Contact Advisor",
    description: "Please speak with one of our advisors to discuss the next steps for your application.",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <PhoneCall className="w-8 h-8 text-purple-600" />,
    nextSteps: [
      "Call our team on 02-626-8100 during business hours (Mon–Fri, 8:30–17:30).",
      "Alternatively, send a message via LINE for a faster response.",
      "Please have your reference number ready when you contact us.",
    ],
  },
  rejected: {
    label: "Unable to Proceed",
    description: "We regret that we are unable to approve this application at this time based on our current lending criteria.",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    icon: <XCircle className="w-8 h-8 text-red-600" />,
    nextSteps: [
      "You may reapply after 6 months if your financial circumstances change.",
      "Contact our advisors to discuss alternative financing options.",
      "A formal letter will be sent to your registered email address.",
    ],
  },
};

const MISSING_DOCS = [
  "Bank Statement (last 3 months) — pages appear incomplete",
  "Proof of Income — most recent month's salary slip required",
];

function resolveStatus(ref: string): StatusKey {
  const last = ref.trim().slice(-1);
  if (last === "0" || last === "1") return "submitted";
  if (last === "2" || last === "3") return "review";
  if (last === "4" || last === "5") return "docs";
  if (last === "6" || last === "7") return "approved";
  if (last === "8") return "contact";
  return "rejected";
}

function ContactOptions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href="https://line.me" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[oklch(0.7_0.18_150)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
        <MessageCircle className="w-4 h-4" /> Chat via LINE
      </a>
      <a href="tel:026268100" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors">
        <Phone className="w-4 h-4" /> 02-626-8100
      </a>
      <a href="mailto:info@icbcthai-leasing.com" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors">
        <Mail className="w-4 h-4" /> Email Us
      </a>
    </div>
  );
}

function StatusResult({ refNo, statusKey }: { refNo: string; statusKey: StatusKey }) {
  const cfg = CONFIGS[statusKey];
  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">{cfg.icon}</div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Reference: <span className="font-semibold text-foreground">{refNo}</span></p>
          <span className={["inline-block text-sm font-semibold px-3 py-1 rounded-full border", cfg.badgeClass].join(" ")}>{cfg.label}</span>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed">{cfg.description}</p>

      {statusKey === "docs" && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <p className="text-sm font-semibold text-orange-800">Missing Documents</p>
          </div>
          <ul className="space-y-1 pl-6 list-disc">
            {MISSING_DOCS.map((doc) => <li key={doc} className="text-sm text-orange-700">{doc}</li>)}
          </ul>
        </div>
      )}

      <div className="bg-muted/60 border border-border rounded-xl p-4">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Next Steps</p>
        <ul className="space-y-1.5">
          {cfg.nextSteps.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-foreground">
              <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />{s}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Questions? Contact us directly:</p>
        <ContactOptions />
      </div>
    </div>
  );
}

function StatusPage() {
  const [refNo, setRefNo] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<StatusKey | null>(null);
  const [submittedRef, setSubmittedRef] = useState("");
  const [error, setError] = useState("");

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!refNo.trim()) { setError("Please enter your application reference number."); return; }
    if (!contact.trim()) { setError("Please enter your mobile number or email address."); return; }
    setResult(resolveStatus(refNo.trim().toUpperCase()));
    setSubmittedRef(refNo.trim().toUpperCase());
  }

  function handleReset() {
    setResult(null); setSubmittedRef(""); setRefNo(""); setContact(""); setError("");
  }

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Check Application Status</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter your reference number to see the latest status of your loan application.</p>

        <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] p-6">
          {result === null ? (
            <form onSubmit={handleCheck} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Application Reference Number <span className="text-primary">*</span></label>
                <input type="text" className={inputClass} placeholder="e.g. ICBC-A3X9K2" value={refNo} onChange={(e) => setRefNo(e.target.value)} autoComplete="off" spellCheck={false} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Mobile Number or Email Address <span className="text-primary">*</span></label>
                <input type="text" className={inputClass} placeholder="e.g. 081-234-5678 or name@email.com" value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="off" />
              </div>
              {error && (
                <p className="text-sm text-destructive flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </p>
              )}
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                <Search className="w-4 h-4" /> Check Status
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <StatusResult refNo={submittedRef} statusKey={result} />
              <button type="button" onClick={handleReset} className="text-sm text-primary hover:underline underline-offset-2 font-medium">
                Check another application
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/apply" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Submit a New Application <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

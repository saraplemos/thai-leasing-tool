import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  CheckCircle2,
  ChevronRight,
  Check,
  Upload,
  X,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>) => ({
    amount: typeof search.amount === "number" ? search.amount : 1_000_000,
    term: typeof search.term === "number" ? search.term : 60,
    rate: typeof search.rate === "number" ? search.rate : 7.03,
    monthly: typeof search.monthly === "number" ? search.monthly : 0,
  }),
  component: ApplyPage,
});

interface PersonalDetails {
  fullName: string;
  mobile: string;
  email: string;
  nationality: "Thai" | "Non-Thai" | "";
  idNumber: string;
}

interface LoanDetails {
  amount: number;
  term: number;
  rate: number;
  monthly: number;
  vehicleType: string;
  vehicleBrandModel: string;
  condition: "New" | "Used" | "";
  contactMethod: "Email" | "Phone Call" | "LINE" | "";
}

interface UploadedFile {
  file: File;
  name: string;
  size: number;
}

interface DocumentUploads {
  idCard: UploadedFile | null;
  proofOfIncome: UploadedFile | null;
  bankStatement: UploadedFile | null;
  vehicleDoc: UploadedFile | null;
  companyReg: UploadedFile | null;
  other: UploadedFile | null;
}

function formatTHB(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " THB";
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function generateRef(): string {
  return "ICBC-" + Date.now().toString(36).toUpperCase().slice(-6);
}

const STEP_LABELS = [
  "Personal Details",
  "Loan Details",
  "Documents",
  "Review & Submit",
];

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-8 px-2">
      {STEP_LABELS.map((label, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={[
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  isCompleted || isActive
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={[
                  "mt-1 text-[11px] font-medium text-center hidden sm:block",
                  isActive ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {idx < STEP_LABELS.length - 1 && (
              <div
                className={[
                  "h-0.5 w-10 sm:w-16 md:w-20 mx-1 mt-[-18px] sm:mt-[-28px] transition-colors",
                  isCompleted ? "bg-primary" : "bg-border",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface DocSpec {
  key: keyof DocumentUploads;
  label: string;
  description: string;
  required: boolean;
}

const DOC_SPECS: DocSpec[] = [
  { key: "idCard", label: "ID Card / Passport", description: "Thai national ID card or passport (photo page)", required: true },
  { key: "proofOfIncome", label: "Proof of Income", description: "Salary slip or income statement (last 3 months)", required: true },
  { key: "bankStatement", label: "Bank Statement", description: "Bank statement for the last 3–6 months", required: true },
  { key: "vehicleDoc", label: "Vehicle / Asset Document", description: "Vehicle registration or asset details", required: false },
  { key: "companyReg", label: "Company Registration Document", description: "For business loan applicants", required: false },
  { key: "other", label: "Other Supporting Document", description: "Any additional supporting documents", required: false },
];

function DocUpload({
  uploads,
  onChange,
}: {
  uploads: DocumentUploads;
  onChange: (key: keyof DocumentUploads, file: UploadedFile | null) => void;
}) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function handleFileChange(key: keyof DocumentUploads, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(key, { file, name: file.name, size: file.size });
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground bg-muted rounded-lg px-4 py-2 border border-border">
        Accepted: PDF, JPG, PNG &middot; Max 10 MB per file
      </p>
      {DOC_SPECS.map((spec) => {
        const uploaded = uploads[spec.key];
        return (
          <div key={spec.key} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-border rounded-xl p-4 bg-background">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">{spec.label}</span>
                {spec.required && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">Required</span>
                )}
                {uploaded && (
                  <span className="flex items-center gap-1 text-[11px] text-green-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Uploaded
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{spec.description}</p>
              {uploaded && (
                <p className="text-xs text-foreground mt-1 truncate">
                  {uploaded.name} <span className="text-muted-foreground">({formatFileSize(uploaded.size)})</span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {uploaded ? (
                <button
                  type="button"
                  onClick={() => onChange(spec.key, null)}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                >
                  <X className="w-4 h-4" /> Remove
                </button>
              ) : (
                <>
                  <input
                    ref={(el) => { inputRefs.current[spec.key] = el; }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileChange(spec.key, e)}
                  />
                  <button
                    type="button"
                    onClick={() => inputRefs.current[spec.key]?.click()}
                    className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-foreground mb-1">
      {children}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
  );
}

const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const selectClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
const readonlyClass = "w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-foreground cursor-default select-none";

function Step1({ data, onChange }: { data: PersonalDetails; onChange: (d: PersonalDetails) => void }) {
  function set<K extends keyof PersonalDetails>(key: K, value: PersonalDetails[K]) {
    onChange({ ...data, [key]: value });
  }
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel required>Full Name</FieldLabel>
        <input type="text" className={inputClass} placeholder="e.g. Somchai Jaidee" value={data.fullName} onChange={(e) => set("fullName", e.target.value)} />
      </div>
      <div>
        <FieldLabel required>Mobile Number</FieldLabel>
        <input type="tel" className={inputClass} placeholder="e.g. 081-234-5678" value={data.mobile} onChange={(e) => set("mobile", e.target.value)} />
      </div>
      <div>
        <FieldLabel required>Email Address</FieldLabel>
        <input type="email" className={inputClass} placeholder="e.g. name@email.com" value={data.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div>
        <FieldLabel required>Nationality</FieldLabel>
        <select className={selectClass} value={data.nationality} onChange={(e) => set("nationality", e.target.value as PersonalDetails["nationality"])}>
          <option value="">Select nationality</option>
          <option value="Thai">Thai</option>
          <option value="Non-Thai">Non-Thai</option>
        </select>
      </div>
      <div>
        <FieldLabel required>{data.nationality === "Non-Thai" ? "Passport Number" : "ID Card Number"}</FieldLabel>
        <input
          type="text"
          className={inputClass}
          placeholder={data.nationality === "Non-Thai" ? "e.g. A12345678" : "e.g. 1-2345-67890-12-3"}
          value={data.idNumber}
          onChange={(e) => set("idNumber", e.target.value)}
        />
      </div>
    </div>
  );
}

function Step2({ data, onChange }: { data: LoanDetails; onChange: (d: LoanDetails) => void }) {
  function set<K extends keyof LoanDetails>(key: K, value: LoanDetails[K]) {
    onChange({ ...data, [key]: value });
  }
  return (
    <div className="space-y-5">
      <div>
        <FieldLabel required>Loan Amount</FieldLabel>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">THB</span>
          <input type="number" className={inputClass + " pl-12"} value={data.amount} min={100_000} max={50_000_000} step={50_000} onChange={(e) => set("amount", Number(e.target.value))} />
        </div>
      </div>
      <div>
        <FieldLabel required>Loan Term</FieldLabel>
        <select className={selectClass} value={data.term} onChange={(e) => set("term", Number(e.target.value))}>
          {[12, 24, 36, 48, 60, 72, 84].map((m) => (
            <option key={m} value={m}>{m} months</option>
          ))}
        </select>
      </div>
      <div>
        <FieldLabel>Interest Rate (pre-indicative)</FieldLabel>
        <div className={readonlyClass}>{data.rate.toFixed(2)}% per annum</div>
      </div>
      <div>
        <FieldLabel>Estimated Monthly Payment</FieldLabel>
        <div className={readonlyClass}>
          {data.monthly > 0 ? formatTHB(data.monthly) : "—"} <span className="text-xs text-muted-foreground">(estimate only)</span>
        </div>
      </div>
      <div>
        <FieldLabel required>Vehicle / Asset Type</FieldLabel>
        <select className={selectClass} value={data.vehicleType} onChange={(e) => set("vehicleType", e.target.value)}>
          <option value="">Select type</option>
          <option value="Car">Car</option>
          <option value="Pickup Truck">Pickup Truck</option>
          <option value="Commercial Vehicle">Commercial Vehicle</option>
          <option value="Solar Equipment">Solar Equipment</option>
          <option value="Business Asset">Business Asset</option>
        </select>
      </div>
      <div>
        <FieldLabel required>Vehicle Brand / Model</FieldLabel>
        <input type="text" className={inputClass} placeholder="e.g. Toyota Fortuner 2.8 GD-6 4WD" value={data.vehicleBrandModel} onChange={(e) => set("vehicleBrandModel", e.target.value)} />
      </div>
      <div>
        <FieldLabel required>Condition</FieldLabel>
        <div className="flex gap-6 mt-1">
          {(["New", "Used"] as const).map((cond) => (
            <label key={cond} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
              <input type="radio" name="condition" value={cond} checked={data.condition === cond} onChange={() => set("condition", cond)} className="accent-primary w-4 h-4" />
              {cond}
            </label>
          ))}
        </div>
      </div>
      <div>
        <FieldLabel required>Preferred Contact Method</FieldLabel>
        <select className={selectClass} value={data.contactMethod} onChange={(e) => set("contactMethod", e.target.value as LoanDetails["contactMethod"])}>
          <option value="">Select method</option>
          <option value="Email">Email</option>
          <option value="Phone Call">Phone Call</option>
          <option value="LINE">LINE</option>
        </select>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2 border-b border-border last:border-0">
      <dt className="w-44 shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground font-medium flex-1">{value || "—"}</dd>
    </div>
  );
}

function Step4({
  personal, loan, uploads, pdpa, onPdpa, disclaimer, onDisclaimer,
}: {
  personal: PersonalDetails;
  loan: LoanDetails;
  uploads: DocumentUploads;
  pdpa: boolean;
  onPdpa: (v: boolean) => void;
  disclaimer: boolean;
  onDisclaimer: (v: boolean) => void;
}) {
  const uploadedDocs = DOC_SPECS.filter((s) => uploads[s.key] !== null);
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Personal Details</h3>
        <dl className="rounded-xl border border-border bg-muted/40 px-4 py-1">
          <ReviewRow label="Full Name" value={personal.fullName} />
          <ReviewRow label="Mobile Number" value={personal.mobile} />
          <ReviewRow label="Email Address" value={personal.email} />
          <ReviewRow label="Nationality" value={personal.nationality} />
          <ReviewRow label={personal.nationality === "Non-Thai" ? "Passport Number" : "ID Card Number"} value={personal.idNumber} />
        </dl>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Loan & Vehicle Details</h3>
        <dl className="rounded-xl border border-border bg-muted/40 px-4 py-1">
          <ReviewRow label="Loan Amount" value={formatTHB(loan.amount)} />
          <ReviewRow label="Loan Term" value={`${loan.term} months`} />
          <ReviewRow label="Interest Rate" value={`${loan.rate.toFixed(2)}% per annum`} />
          <ReviewRow label="Est. Monthly Payment" value={loan.monthly > 0 ? formatTHB(loan.monthly) : "—"} />
          <ReviewRow label="Vehicle / Asset Type" value={loan.vehicleType} />
          <ReviewRow label="Brand / Model" value={loan.vehicleBrandModel} />
          <ReviewRow label="Condition" value={loan.condition} />
          <ReviewRow label="Preferred Contact" value={loan.contactMethod} />
        </dl>
      </section>
      <section>
        <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Documents</h3>
        <dl className="rounded-xl border border-border bg-muted/40 px-4 py-1">
          {uploadedDocs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">No documents uploaded.</p>
          ) : (
            uploadedDocs.map((spec) => (
              <ReviewRow
                key={spec.key}
                label={spec.label}
                value={
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    {uploads[spec.key]?.name}
                  </span>
                }
              />
            ))
          )}
        </dl>
      </section>
      <section className="space-y-3 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={pdpa} onChange={(e) => onPdpa(e.target.checked)} className="accent-primary mt-0.5 w-4 h-4 shrink-0" />
          <span className="text-sm text-foreground">
            I consent to ICBC (Thai) Leasing collecting, using, and disclosing my personal data for the purpose of evaluating my loan application, in accordance with the{" "}
            <a href="#" className="text-primary underline underline-offset-2">Personal Data Protection Policy (PDPA)</a>.{" "}
            <span className="text-primary font-medium">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={disclaimer} onChange={(e) => onDisclaimer(e.target.checked)} className="accent-primary mt-0.5 w-4 h-4 shrink-0" />
          <span className="text-sm text-foreground">
            I understand that monthly payment figures are estimates only and subject to final credit approval.{" "}
            <span className="text-primary font-medium">*</span>
          </span>
        </label>
      </section>
    </div>
  );
}

function ConfirmationScreen({ refNo }: { refNo: string }) {
  return (
    <div className="text-center py-8 px-4 space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Application Submitted!</h2>
        <p className="text-muted-foreground text-sm">Thank you for applying with ICBC (Thai) Leasing.</p>
      </div>
      <div className="inline-block bg-muted rounded-2xl border border-border px-8 py-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest font-medium">Reference Number</p>
        <p className="text-2xl font-bold text-primary tracking-wider">{refNo}</p>
        <p className="text-xs text-muted-foreground mt-1">Please save this for your records</p>
      </div>
      <div className="bg-muted/60 border border-border rounded-xl px-6 py-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Expected response: </span>within 2–3 business days
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Contact us</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="https://line.me"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[oklch(0.7_0.18_150)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" /> Chat via LINE
          </a>
          <a
            href="tel:026268100"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <Phone className="w-4 h-4" /> 02-626-8100
          </a>
          <a
            href="mailto:info@icbcthai-leasing.com"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            <Mail className="w-4 h-4" /> Email Us
          </a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
        <Link
          to="/status"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Check Application Status <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ApplyPage() {
  const search = Route.useSearch();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refNo] = useState(generateRef);

  const [personal, setPersonal] = useState<PersonalDetails>({ fullName: "", mobile: "", email: "", nationality: "", idNumber: "" });
  const [loan, setLoan] = useState<LoanDetails>({
    amount: search.amount,
    term: search.term,
    rate: search.rate,
    monthly: search.monthly,
    vehicleType: "",
    vehicleBrandModel: "",
    condition: "",
    contactMethod: "",
  });
  const [uploads, setUploads] = useState<DocumentUploads>({
    idCard: null, proofOfIncome: null, bankStatement: null, vehicleDoc: null, companyReg: null, other: null,
  });
  const [pdpa, setPdpa] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  function handleUploadChange(key: keyof DocumentUploads, file: UploadedFile | null) {
    setUploads((prev) => ({ ...prev, [key]: file }));
  }

  function canContinue(): boolean {
    if (step === 1) return !!(personal.fullName.trim() && personal.mobile.trim() && personal.email.trim() && personal.nationality && personal.idNumber.trim());
    if (step === 2) return !!(loan.amount > 0 && loan.term && loan.vehicleType && loan.vehicleBrandModel.trim() && loan.condition && loan.contactMethod);
    if (step === 3) return !!(uploads.idCard && uploads.proofOfIncome && uploads.bankStatement);
    if (step === 4) return pdpa && disclaimer;
    return true;
  }

  function handleNext() {
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
  }

  const stepTitles = ["Personal Details", "Loan & Vehicle Details", "Upload Documents", "Review & Submit"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        {!submitted && <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Loan Application</h1>}
        {!submitted && <ProgressBar currentStep={step} />}

        <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          {submitted ? (
            <ConfirmationScreen refNo={refNo} />
          ) : (
            <>
              <div className="px-6 pt-6 pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">{step}</span>
                  <h2 className="text-lg font-semibold text-foreground">{stepTitles[step - 1]}</h2>
                </div>
              </div>
              <div className="px-6 py-6">
                {step === 1 && <Step1 data={personal} onChange={setPersonal} />}
                {step === 2 && <Step2 data={loan} onChange={setLoan} />}
                {step === 3 && <DocUpload uploads={uploads} onChange={handleUploadChange} />}
                {step === 4 && (
                  <Step4 personal={personal} loan={loan} uploads={uploads} pdpa={pdpa} onPdpa={setPdpa} disclaimer={disclaimer} onDisclaimer={setDisclaimer} />
                )}
              </div>
              <div className="px-6 pb-6 pt-2 flex justify-between gap-3 border-t border-border">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors">
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue()}
                  className={[
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                    canContinue() ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed",
                  ].join(" ")}
                >
                  {step === 4 ? "Submit Application" : "Continue"}
                  {step < 4 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </>
          )}
        </div>

        {!submitted && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Need help?{" "}
            <a href="tel:026268100" className="text-primary hover:underline font-medium">Call 02-626-8100</a>{" "}
            or chat via{" "}
            <a href="https://line.me" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">LINE</a>.
          </p>
        )}
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FileText, ShieldAlert, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type AppStatus = "Submitted" | "Under Review" | "Documents Required" | "Approved in Principle" | "Contact Advisor" | "Rejected";

interface Application {
  ref: string;
  name: string;
  date: string;
  amount: number;
  vehicleType: string;
  status: AppStatus;
}

const MOCK: Application[] = [
  { ref: "ICBC-A3X9K2", name: "Somchai Pornprasert",  date: "2026-04-28", amount: 1_500_000, vehicleType: "Car",                status: "Under Review" },
  { ref: "ICBC-B7M2P1", name: "Niran Kositratana",    date: "2026-04-27", amount: 3_200_000, vehicleType: "Commercial Vehicle", status: "Documents Required" },
  { ref: "ICBC-C1K8Q4", name: "Pranee Thongchai",     date: "2026-04-27", amount: 800_000,   vehicleType: "Car",                status: "Approved in Principle" },
  { ref: "ICBC-D5X3R7", name: "Wichai Buranasiri",    date: "2026-04-25", amount: 2_100_000, vehicleType: "Pickup Truck",       status: "Under Review" },
  { ref: "ICBC-E9P6L0", name: "Supatra Meechai",      date: "2026-04-24", amount: 650_000,   vehicleType: "Car",                status: "Submitted" },
  { ref: "ICBC-F2W4N8", name: "Chaiwat Srisombat",    date: "2026-04-23", amount: 5_000_000, vehicleType: "Business Asset",     status: "Contact Advisor" },
  { ref: "ICBC-G6T1B3", name: "Malee Pongpanich",     date: "2026-04-22", amount: 1_200_000, vehicleType: "Solar Equipment",    status: "Approved in Principle" },
  { ref: "ICBC-H0V7C5", name: "Thanakorn Wongkham",   date: "2026-04-20", amount: 950_000,   vehicleType: "Car",                status: "Rejected" },
];

const ALL_STATUSES: AppStatus[] = ["Submitted", "Under Review", "Documents Required", "Approved in Principle", "Contact Advisor", "Rejected"];

const BADGE: Record<AppStatus, string> = {
  "Submitted":            "bg-blue-100   text-blue-800   border-blue-200",
  "Under Review":         "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Documents Required":   "bg-orange-100 text-orange-800 border-orange-200",
  "Approved in Principle":"bg-green-100  text-green-800  border-green-200",
  "Contact Advisor":      "bg-purple-100 text-purple-800 border-purple-200",
  "Rejected":             "bg-red-100    text-red-800    border-red-200",
};

const STAT_CARD: Record<AppStatus, { card: string; count: string }> = {
  "Submitted":            { card: "bg-blue-50   border-blue-200",   count: "text-blue-700" },
  "Under Review":         { card: "bg-yellow-50 border-yellow-200", count: "text-yellow-700" },
  "Documents Required":   { card: "bg-orange-50 border-orange-200", count: "text-orange-700" },
  "Approved in Principle":{ card: "bg-green-50  border-green-200",  count: "text-green-700" },
  "Contact Advisor":      { card: "bg-purple-50 border-purple-200", count: "text-purple-700" },
  "Rejected":             { card: "bg-red-50    border-red-200",    count: "text-red-700" },
};

function formatTHB(v: number) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function StatusBadge({ status }: { status: AppStatus }) {
  return <span className={["inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap", BADGE[status]].join(" ")}>{status}</span>;
}

function StatCards({ apps }: { apps: Application[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {ALL_STATUSES.map((s) => {
        const count = apps.filter((a) => a.status === s).length;
        const cls = STAT_CARD[s];
        return (
          <div key={s} className={["rounded-xl border p-3 text-center", cls.card].join(" ")}>
            <p className={["text-2xl font-bold", cls.count].join(" ")}>{count}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">{s}</p>
          </div>
        );
      })}
    </div>
  );
}

function StatusDropdown({ current, onChange }: { current: AppStatus; onChange: (s: AppStatus) => void }) {
  return (
    <div className="relative">
      <select
        className="appearance-none text-xs font-medium pl-2 pr-6 py-1 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
        value={current}
        onChange={(e) => onChange(e.target.value as AppStatus)}
      >
        {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function AdminPage() {
  const [apps, setApps] = useState<Application[]>(MOCK);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<AppStatus | "">("");

  function updateStatus(ref: string, status: AppStatus) {
    setApps((prev) => prev.map((a) => (a.ref === ref ? { ...a, status } : a)));
  }

  const filtered = apps.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.ref.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.vehicleType.toLowerCase().includes(q);
    return matchSearch && (!filterStatus || a.status === filterStatus);
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="bg-primary text-primary-foreground text-center py-2 px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold">
          <ShieldAlert className="w-4 h-4" /> Internal Use Only — Admin Dashboard
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and review incoming loan applications.</p>
        </div>

        <StatCards apps={apps} />

        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              placeholder="Search by ref, name, or vehicle type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AppStatus | "")}
            >
              <option value="">All Statuses</option>
              {ALL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60">
                  {["Ref #", "Applicant Name", "Submitted", "Loan Amount (THB)", "Vehicle Type", "Status", "Actions"].map((h, i) => (
                    <th key={h} className={["px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", i === 3 ? "text-right" : "text-left"].join(" ")}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-sm text-muted-foreground">No applications match your search.</td></tr>
                ) : (
                  filtered.map((app, idx) => (
                    <tr key={app.ref} className={["border-b border-border hover:bg-muted/40 transition-colors", idx % 2 !== 0 ? "bg-muted/20" : ""].join(" ")}>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground whitespace-nowrap">{app.ref}</td>
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{app.name}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{formatDate(app.date)}</td>
                      <td className="px-4 py-3 text-right font-medium text-foreground whitespace-nowrap tabular-nums">{formatTHB(app.amount)}</td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">{app.vehicleType}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={app.status} /></td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button type="button" className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
                            <FileText className="w-3.5 h-3.5" /> View Docs
                          </button>
                          <StatusDropdown current={app.status} onChange={(s) => updateStatus(app.ref, s)} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-border bg-muted/40 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {apps.length} applications</p>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

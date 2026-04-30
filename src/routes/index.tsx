import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Percent,
  Clock,
  Headphones,
  ShieldCheck,
  Lock,
  CreditCard,
  FileText,
  IdCard,
  Wallet,
  Building2,
  Car,
  Sun,
  Users,
  Zap,
  Quote,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { LoanCalculator } from "@/components/loan-calculator";
import { Prequalification } from "@/components/prequalification";
import { StickyCta } from "@/components/sticky-cta";
import heroCar from "@/assets/hero-car.jpg";
import productAuto from "@/assets/product-auto.jpg";
import productBusiness from "@/assets/product-business.jpg";
import productSolar from "@/assets/product-solar.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Products />
        <Prequalification />
        <ApplicationSupport />
        <SocialProof />
        <LeadCapture />
      </main>
      <SiteFooter />
      <StickyCta />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="calculator"
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* calculator */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <LoanCalculator />
        </div>

        {/* hero content */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[16/10] shadow-[var(--shadow-card)]">
            <img
              src={heroCar}
              alt="Drive with ICBC Thai Leasing"
              width={1536}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            Drive your success with{" "}
            <span className="text-primary">ICBC (Thai) Leasing</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl">
            Flexible financing solutions for your car and business with competitive rates and professional service backed by a global financial group.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl">
            {[
              { icon: Percent, title: "Competitive Rates", desc: "Effective rates 7.03% – 14.69% p.a." },
              { icon: Clock, title: "Fast Approval", desc: "Get approval quickly and easily" },
              { icon: Headphones, title: "Expert Support", desc: "Our team is here to help you" },
            ].map((f) => (
              <div key={f.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent mb-3">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm font-bold text-foreground">{f.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="#products"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
            >
              View Products <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* decorative red accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary to-[var(--primary-dark)]" />
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: "Trusted by ICBC", desc: "Backed by ICBC, a global financial group" },
    { icon: Lock, title: "Secure & Compliant", desc: "Your data is protected with world-class security" },
    { icon: CreditCard, title: "Multiple Payment Channels", desc: "Bank transfer, QR code, and more" },
    { icon: FileText, title: "Transparent Information", desc: "Clear rates and fees with no hidden charges" },
  ];
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 lg:divide-x divide-border">
          {items.map((it, i) => (
            <div key={it.title} className={`flex items-start gap-4 ${i > 0 ? "lg:pl-8" : ""}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{it.title}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const products = [
    {
      img: productAuto,
      icon: Car,
      title: "Auto Financing",
      desc: "New and used car financing with flexible terms tailored to your lifestyle.",
    },
    {
      img: productBusiness,
      icon: Building2,
      title: "Business Financing",
      desc: "Strategic financial solutions to fuel your business growth and operations.",
    },
    {
      img: productSolar,
      icon: Sun,
      title: "Solar Financing",
      desc: "Invest in clean renewable energy for a more sustainable, cost-efficient future.",
    },
  ];
  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Products</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Solutions tailored to your needs
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-primary" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl bg-card border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{p.title}</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">{p.desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group/link"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationSupport() {
  const items = [
    { icon: IdCard, title: "ID / Passport", desc: "Valid government-issued identification" },
    { icon: Wallet, title: "Proof of Income", desc: "Salary slip or income statement" },
    { icon: FileText, title: "Bank Statements", desc: "Last 3–6 months of statements" },
    { icon: Car, title: "Asset Details", desc: "Vehicle, equipment or project info" },
  ];
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Application Support</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            What you need to apply
          </h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-md">
            Prepare these documents to make your application smooth and fast. Our team will guide you through every step.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
          >
            Start application <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary transition group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent group-hover:bg-primary transition">
                  <it.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition" />
                </div>
                <span className="text-2xl font-black text-border group-hover:text-primary/30 transition">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Customers financed" },
    { icon: Clock, value: "24–48h", label: "Fast approval window" },
    { icon: Zap, value: "98%", label: "Customer satisfaction" },
    { icon: ShieldCheck, value: "20+", label: "Years of trust" },
  ];
  const testimonials = [
    {
      quote:
        "The process was clear from start to finish. I had my new car within days, and the rate was better than my bank quoted.",
      name: "Somchai P.",
      role: "Auto Financing customer",
    },
    {
      quote:
        "ICBC Leasing helped us scale operations with a tailored business plan. Their advisors really understood our cash flow.",
      name: "Niran K.",
      role: "SME Owner, Bangkok",
    },
  ];
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Trusted partner</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Numbers that build confidence
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/5 border border-white/10 p-7 backdrop-blur"
            >
              <s.icon className="h-6 w-6 text-primary mb-4" />
              <div className="text-3xl lg:text-4xl font-black tracking-tight">{s.value}</div>
              <div className="text-xs uppercase tracking-wider text-background/60 mt-2 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/40" />
              <blockquote className="text-lg leading-relaxed text-background/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-background/60">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadCapture() {
  return (
    <section id="apply" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-card border border-border p-10 lg:p-14 shadow-[var(--shadow-elevated)] relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-accent rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="relative">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Get started today
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight max-w-2xl">
              Send your quote to email or LINE — we'll do the rest
            </h2>
            <p className="mt-4 text-foreground/70 max-w-xl">
              Speak to an advisor or receive your personalised quote directly. No commitment, no pressure — just clear answers.
            </p>

            <form className="mt-8 grid sm:grid-cols-[1fr_auto] gap-3 max-w-xl">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-12 px-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider hover:bg-[var(--primary-dark)] transition"
              >
                Send quote <Mail className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href="#"
                className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition"
              >
                <MessageCircle className="h-4 w-4 text-[oklch(0.7_0.18_150)]" /> Chat via LINE
              </a>
              <a
                href="tel:026268100"
                className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition"
              >
                <Phone className="h-4 w-4 text-primary" /> 02-626-8100
              </a>
              <span className="text-xs text-muted-foreground">Mon–Fri, 09:00–18:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-foreground">ICBC</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-black">工</span>
              <span className="text-base font-bold text-foreground">工银泰国</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ICBC (Thai) Leasing Company Limited. A trusted member of the ICBC global financial group, providing flexible financing solutions in Thailand.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Auto Financing</a></li>
              <li><a href="#" className="hover:text-primary">Business Financing</a></li>
              <li><a href="#" className="hover:text-primary">Solar Financing</a></li>
              <li><a href="#" className="hover:text-primary">Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">News</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>02-626-8100 / 02-876-7200</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>info@icbcthai-leasing.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ICBC (Thai) Leasing Co., Ltd. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

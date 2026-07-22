import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalIdentityLine, LegalContactBlock } from "@/components/LegalEntity";

const LAST_UPDATED = "July 22, 2026";

const STARTING_POINTS = [
  {
    service: "Custom Mobile Apps",
    from: "₹3,00,000",
    href: "/services/mobile-app-development",
    note: "Native iOS & Android — bookings, payments, loyalty, push, admin dashboard.",
  },
  {
    service: "AI Voice Agents",
    from: "₹1,50,000",
    href: "/services/ai-voice-agents",
    note: "Hindi, English & Punjabi voices — inbound handling, outbound campaigns, CRM integration.",
  },
  {
    service: "Automation & AI Systems",
    from: "₹80,000",
    href: "/services/automation-systems",
    note: "WhatsApp, CRM, email, and calendar workflows — fully managed and monitored.",
  },
];

export default function Pricing() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Indicative starting prices for Everyday Digital Solutions' custom mobile apps (from ₹3 Lakh), AI voice agents (from ₹1.5 Lakh), and automation systems (from ₹80,000). Final pricing is confirmed in a written proposal."
        canonical="/pricing"
      />
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <article className="max-w-3xl mx-auto px-6 py-10 lg:py-16 prose prose-neutral dark:prose-invert prose-headings:font-serif">
          <Link
            href="/"
            className="not-prose inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>

          <header className="not-prose mb-10 pb-6 border-b border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              Pricing · Last updated {LAST_UPDATED}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">
              Transparent <em className="italic text-primary">Pricing</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every project is custom-scoped and quoted upfront — fixed price,
              no hourly-billing surprises. These are honest starting points,
              not teaser rates.
            </p>
            <LegalIdentityLine />
          </header>

          <h2>Indicative starting prices</h2>
          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-medium text-foreground">Service</th>
                  <th className="text-left py-3 pr-4 font-medium text-foreground whitespace-nowrap">Starting at</th>
                  <th className="text-left py-3 pr-4 font-medium text-foreground">What&rsquo;s typically included</th>
                </tr>
              </thead>
              <tbody>
                {STARTING_POINTS.map((row) => (
                  <tr key={row.service} className="border-b border-border/40 align-top">
                    <td className="py-3 pr-4">
                      <Link href={row.href} className="text-primary hover:underline font-medium">
                        {row.service}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap font-medium text-foreground">
                      {row.from}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Web design &amp; development is quoted per project — see the{" "}
            <Link href="/services/web-design-development">service page</Link>{" "}
            for what a build includes.
          </p>

          <h2>What moves the price</h2>
          <ul>
            <li>
              <strong>Scope</strong> — the number of screens, user roles,
              features, and admin tooling.
            </li>
            <li>
              <strong>Integrations</strong> — payment gateways, CRMs,
              calendars, WhatsApp, telephony, and third-party APIs.
            </li>
            <li>
              <strong>Platforms</strong> — iOS, Android, web, or all three;
              one language or multilingual voice agents.
            </li>
            <li>
              <strong>Timeline</strong> — our standard cadence is ~30 days;
              compressed timelines can affect pricing.
            </li>
          </ul>

          <h2>How quoting works</h2>
          <p>
            After a short discovery conversation, we send a written proposal
            stating the exact scope, deliverables, milestone schedule, and
            fixed price. <strong>Final pricing, applicable taxes (GST as
            applicable), billing currency, and the payment schedule are
            confirmed in that written proposal before any work begins.</strong>{" "}
            Nothing on this page is itself a binding offer.
          </p>
          <p>
            Payments are collected via Razorpay per the milestone schedule in
            your proposal. Cancellations and refunds are governed by our{" "}
            <Link href="/refund">Cancellation &amp; Refund Policy</Link>.
          </p>

          <h2>Overseas clients (US, Canada &amp; beyond)</h2>
          <p>
            For clients outside India, billing may be in USD or CAD, and
            invoices are subject to Indian GST law&rsquo;s treatment of
            export of services. The applicable treatment and any taxes are
            stated on your proposal and invoice.
          </p>

          <div className="not-prose my-10 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-2xl mb-2">Want an exact number?</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Tell us about your project and get a scoped, fixed-price quote —
              usually within 2 business days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/get-a-quote"
                data-track="pricing.getQuote"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                data-track="pricing.contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium hover:bg-muted/40 transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <LegalContactBlock />

          <p className="not-prose mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
            See also:{" "}
            <Link className="text-primary hover:underline" href="/terms">
              Terms &amp; Conditions
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/refund">
              Cancellation &amp; Refunds
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/shipping">
              Shipping &amp; Service Delivery
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

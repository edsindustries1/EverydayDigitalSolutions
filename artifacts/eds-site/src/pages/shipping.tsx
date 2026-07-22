import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalIdentityLine, LegalContactBlock } from "@/components/LegalEntity";
import { site } from "@/lib/constants";

const LAST_UPDATED = "July 22, 2026";

export default function Shipping() {
  return (
    <>
      <SEO
        title="Shipping & Service Delivery Policy"
        description="Everyday Digital Solutions sells digital services only — no physical goods are shipped. How and when we deliver source code, app store builds, staging URLs, and documentation."
        canonical="/shipping"
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
              Legal · Last updated {LAST_UPDATED}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">
              Shipping &amp; <em className="italic text-primary">Service Delivery</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              We build software — nothing physical is ever shipped. Here is
              how, and when, our digital deliverables reach you.
            </p>
            <LegalIdentityLine />
          </header>

          <h2>No physical shipping</h2>
          <p>
            <strong>{site.legalName}</strong> (&ldquo;EDS&rdquo;) provides
            custom software development services — mobile apps, websites, AI
            voice agents, and automation systems.{" "}
            <strong>
              No physical products are sold or shipped. All services and
              deliverables are delivered electronically.
            </strong>{" "}
            There are no shipping charges, couriers, or delivery addresses
            involved in any engagement.
          </p>

          <h2>How deliverables are delivered</h2>
          <p>
            Depending on what your written proposal or Statement of Work (SOW)
            covers, delivery happens through one or more of these channels:
          </p>
          <ul>
            <li>
              <strong>Source code</strong> — via access to a private code
              repository (e.g. GitHub) transferred to or shared with your
              account.
            </li>
            <li>
              <strong>Staging and preview URLs</strong> — working builds you
              can review in the browser or via test-distribution tools during
              the project.
            </li>
            <li>
              <strong>App store releases</strong> — submission and publication
              to the Apple App Store and Google Play Store, on your developer
              accounts or ours as agreed.
            </li>
            <li>
              <strong>Live deployments</strong> — websites, voice agents, and
              automation systems deployed to the agreed hosting/production
              environment.
            </li>
            <li>
              <strong>Documentation and credentials</strong> — handover of
              admin credentials, API keys, and project documentation delivered
              electronically (email or a shared secure channel).
            </li>
          </ul>

          <h2>Delivery timelines</h2>
          <p>
            Our standard project cadence is approximately{" "}
            <strong>30 days from kickoff to launch</strong> for a scoped
            build. Exact timelines, milestones, and delivery dates for your
            project are defined in the written proposal/SOW, which prevails
            over the indicative cadence here. Timelines assume timely client
            feedback, assets, and approvals — third-party review windows (for
            example, App Store and Play Store review) are outside our control
            and are not counted as delay by EDS.
          </p>

          <h2>When delivery is complete</h2>
          <p>
            Delivery of a milestone is deemed complete on{" "}
            <strong>electronic handover of the agreed deliverables</strong>{" "}
            for that milestone — repository access granted, build submitted or
            published, deployment made live, or documentation and credentials
            handed over, as applicable. Cancellations and refunds are governed
            by our{" "}
            <Link href="/refund">Cancellation &amp; Refund Policy</Link>.
          </p>

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
            <Link className="text-primary hover:underline" href="/pricing">
              Pricing
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

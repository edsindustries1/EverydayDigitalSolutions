import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalIdentityLine, LegalContactBlock } from "@/components/LegalEntity";
import { site } from "@/lib/constants";

const LAST_UPDATED = "July 22, 2026";

export default function Refund() {
  return (
    <>
      <SEO
        title="Cancellation & Refund Policy"
        description="How cancellations and refunds work for Everyday Digital Solutions' custom software, app, AI voice agent, and automation services. Refunds via Razorpay to the original payment method."
        canonical="/refund"
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
              Cancellation &amp; <em className="italic text-primary">Refund Policy</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              How cancellations and refunds work for our custom software
              services. Plain English, no fine-print surprises.
            </p>
            <LegalIdentityLine />
          </header>

          <h2>What this policy covers</h2>
          <p>
            This policy applies to all services sold by{" "}
            <strong>{site.legalName}</strong> (&ldquo;EDS&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;): custom mobile app development, web design and
            development, AI voice agents, and automation systems. Every
            engagement is custom-scoped and quoted per project in a written
            proposal or Statement of Work (SOW).
          </p>
          <p>
            <strong>We sell services, not goods.</strong> Nothing physical is
            sold or shipped; all deliverables are digital (see our{" "}
            <Link href="/shipping">Shipping &amp; Service Delivery Policy</Link>).
          </p>

          <h2>How payments are structured</h2>
          <p>
            Projects are paid in milestones or instalments as set out in the
            written proposal — typically an initial payment to book the
            engagement and begin work, followed by payments tied to agreed
            milestones or dates. Payments are collected via Razorpay (UPI,
            cards, net banking) in INR for Indian clients, and may be billed in
            USD or CAD for overseas clients.
          </p>

          <h2>Cancelling an engagement</h2>
          <p>
            You may request cancellation at any time by emailing{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> from the email
            address associated with your project. Please include the project
            name and the reason for cancellation. We will acknowledge the
            request within 2 business days and confirm the status of work
            completed to date.
          </p>
          <p>On cancellation:</p>
          <ul>
            <li>
              <strong>Delivered and in-progress milestones</strong> — payments
              for milestones that have been delivered, or on which work has
              started, are <strong>non-refundable</strong>. Work completed up
              to the cancellation date is handed over per our{" "}
              <Link href="/shipping">delivery policy</Link>.
            </li>
            <li>
              <strong>Future, un-started milestones</strong> — these are simply
              cancelled and <strong>not charged</strong>. If you have pre-paid
              for a milestone on which no work has started, that payment is
              refundable.
            </li>
            <li>
              <strong>Initial booking payments</strong> — the initial payment
              covers scoping, planning, design kick-off, and reserving the
              build slot; once work has begun it is treated as an in-progress
              milestone above. If we have not yet started any work, it is
              refundable.
            </li>
          </ul>
          <p>
            If EDS cancels an engagement for reasons other than your breach of
            the agreed terms, we will refund payments for any undelivered work.
          </p>

          <h2>How refunds are processed</h2>
          <ul>
            <li>
              Approved refunds are issued to the{" "}
              <strong>original payment method</strong> via Razorpay.
            </li>
            <li>
              Refunds are initiated within <strong>5–7 business days</strong>{" "}
              of the refund being agreed in writing. Your bank or card issuer
              may take additional time to post the credit.
            </li>
            <li>
              Refund amounts are net of the value of work already delivered or
              in progress, as set out above.
            </li>
          </ul>

          <h2>Foreign-currency payments</h2>
          <p>
            For clients billed in USD, CAD, or another foreign currency,
            refunds are processed in the{" "}
            <strong>original transaction currency</strong>. Exchange-rate
            differences between the payment date and the refund date, and
            payment-gateway fees charged on the original transaction, are
            non-refundable.
          </p>

          <h2>Chargebacks</h2>
          <p>
            If something has gone wrong, please contact us first at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> before raising a
            chargeback or payment dispute with your bank. Almost every issue
            can be resolved faster directly — and a chargeback freezes the
            refund process while the gateway investigates.
          </p>

          <LegalContactBlock />

          <p className="not-prose mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
            See also:{" "}
            <Link className="text-primary hover:underline" href="/terms">
              Terms &amp; Conditions
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/shipping">
              Shipping &amp; Service Delivery
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

import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LegalIdentityLine } from "@/components/LegalEntity";
import { site } from "@/lib/constants";

const LAST_UPDATED = "July 22, 2026";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="The terms under which Everyday Digital Solutions (GSTIN 03IOMPS6720H1ZL) provides custom software, app development, AI voice agent, and automation services, and under which you may use this website."
        canonical="/terms"
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
              Terms &amp; <em className="italic text-primary">Conditions</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              The rules of the road — for using this website and for engaging
              us to build software. Plain English where possible; the written
              proposal for a specific project governs project specifics.
            </p>
            <LegalIdentityLine />
          </header>

          <h2>1. Who you are agreeing with</h2>
          <p>
            Services on this website are provided by{" "}
            <strong>{site.legalName}</strong> (&ldquo;EDS&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;), GSTIN {site.gstin}, a software
            studio with its registered office at {site.registeredAddress}. By
            using this site or engaging us for services, you agree to these
            terms.
          </p>

          <h2>2. Scope of services</h2>
          <p>
            EDS provides custom software development services: mobile app
            development, web design and development, AI voice agents, and
            automation/AI systems. The specific scope, deliverables, timeline,
            and price of each engagement are governed by the individual written
            proposal or Statement of Work (SOW) for that engagement.{" "}
            <strong>
              If there is any conflict between this website and a written
              proposal/SOW, the proposal/SOW prevails on project specifics.
            </strong>
          </p>

          <h2>3. Quotes and pricing</h2>
          <p>
            All services are custom-quoted per project — see our{" "}
            <Link href="/pricing">Pricing page</Link> for indicative starting
            points. A written proposal is valid for the period stated on it
            (or 30 days from issue if no period is stated). Work begins after
            you accept the proposal in writing and the agreed initial payment
            is received.
          </p>

          <h2>4. Payment terms</h2>
          <p>
            Invoices are payable per the milestone or instalment schedule set
            out in the proposal, and payments are collected via{" "}
            <strong>Razorpay</strong> (UPI, cards, net banking). Indian clients
            are billed in INR; overseas clients may be billed in USD or CAD as
            stated on the proposal. If a payment is overdue, we may pause work
            until the account is brought current, and delivery dates shift
            accordingly. Cancellations and refunds are governed by our{" "}
            <Link href="/refund">Cancellation &amp; Refund Policy</Link>.
          </p>

          <h2>5. GST and international billing</h2>
          <p>
            Indian clients are billed with applicable GST at prevailing rates
            under GSTIN {site.gstin}. For overseas clients, the GST treatment
            of export-of-service invoices is applied per prevailing Indian GST
            law; the applicable treatment and any taxes are stated on your
            invoice.
          </p>

          <h2>6. Client responsibilities</h2>
          <p>Project timelines assume that you provide, promptly:</p>
          <ul>
            <li>Feedback and approvals at each review point.</li>
            <li>Brand assets, content, and any required data.</li>
            <li>
              Access to accounts we need (app store accounts, domains, hosting,
              CRMs, telephony) where the SOW requires it.
            </li>
          </ul>
          <p>
            Delays in client inputs extend delivery dates day-for-day; they do
            not create liability for EDS.
          </p>

          <h2>7. Delivery</h2>
          <p>
            All deliverables are digital and delivered electronically —
            repository access, staging URLs, app store submission, live
            deployments, and documentation handover — as described in our{" "}
            <Link href="/shipping">Shipping &amp; Service Delivery Policy</Link>.
            Our standard cadence is approximately 30 days from kickoff for a
            scoped build; exact dates are set in the SOW.
          </p>

          <h2>8. Intellectual property</h2>
          <p>
            Intellectual property in the delivered work transfers to you upon
            full payment for the relevant milestone. EDS retains ownership of
            pre-existing and reusable generic components, libraries, and
            know-how used to build the work (licensed to you as needed for
            your project to function), and retains the right to showcase the
            work as a portfolio piece or case study unless a signed NDA or
            agreement says otherwise.
          </p>
          <p>
            All website content (copy, images, illustrations, code samples) is
            © {new Date().getFullYear()} {site.legalName} unless otherwise
            marked. Client logos and brand marks shown in case studies belong
            to those clients. Code excerpts in blog posts are MIT licensed
            unless otherwise marked.
          </p>

          <h2>9. Third-party services</h2>
          <p>
            Delivered systems commonly depend on third-party services — the
            Apple App Store, Google Play Store, hosting providers, payment
            gateways, telephony and AI APIs. Those services are subject to
            their own terms, pricing, and availability, which EDS does not
            control. App store review outcomes and third-party outages are
            outside our control.
          </p>

          <h2>10. Confidentiality</h2>
          <p>
            Each party will keep the other&rsquo;s non-public business
            information confidential and use it only for the engagement.
            Where a separate NDA is signed, the NDA prevails.
          </p>

          <h2>11. Warranties and limitation of liability</h2>
          <p>
            We provide services with professional skill and care. To the
            maximum extent permitted by law, EDS is not liable for indirect,
            incidental, special, or consequential loss (including lost
            profits or data), and our total liability for any engagement is
            capped at the fees you have paid us for that engagement. For use
            of the free website tools, our liability is capped at zero — the
            calculators and quote generator produce <em>estimates</em>, not
            binding offers.
          </p>

          <h2>12. Term and termination</h2>
          <p>
            An engagement runs until its deliverables are delivered or it is
            cancelled. Either party may terminate per the SOW, or as described
            in our <Link href="/refund">Cancellation &amp; Refund Policy</Link>,
            which governs what happens to payments for completed, in-progress,
            and un-started work.
          </p>

          <h2>13. Using this website</h2>
          <p>
            The website, its content, and free tools (App Cost Calculator,
            Voice ROI Calculator, AI Quote Generator) are provided
            &ldquo;as-is&rdquo; and may change at any time. When you submit a
            form you are inviting us to contact you about your project — we do
            not add you to marketing lists without explicit opt-in (see our{" "}
            <Link href="/privacy">Privacy Policy</Link>). You agree not to
            submit knowingly false information, scrape the site in breach of
            robots.txt, or attempt to access non-public endpoints.
          </p>

          <h2>14. Governing law and jurisdiction</h2>
          <p>
            These terms, and every engagement under them, are governed by the
            laws of India. Disputes are subject to the exclusive jurisdiction
            of the courts at Mohali (SAS Nagar), Punjab.
          </p>

          <h2>15. Changes to these terms</h2>
          <p>
            We may update these terms. If we make a material change, we will
            update the &ldquo;Last updated&rdquo; date and, where practical,
            show a notice on the site for 30 days.
          </p>

          <h2>16. Contact</h2>
          <ul>
            <li>
              <strong>{site.legalName}</strong> (GSTIN: {site.gstin})
            </li>
            <li>
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              Phone / WhatsApp:{" "}
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li>Registered address: {site.registeredAddress}</li>
          </ul>

          <p className="not-prose mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
            See also:{" "}
            <Link className="text-primary hover:underline" href="/privacy">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/refund">
              Cancellation &amp; Refunds
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/shipping">
              Shipping &amp; Service Delivery
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/pricing">
              Pricing
            </Link>{" "}
            ·{" "}
            <Link className="text-primary hover:underline" href="/cookies">
              Cookies
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

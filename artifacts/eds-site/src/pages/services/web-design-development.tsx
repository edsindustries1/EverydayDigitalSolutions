import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PageHero } from "@/components/pages/PageHero";
import { FeatureGrid } from "@/components/pages/FeatureGrid";
import { InlinePageFAQ } from "@/components/pages/InlinePageFAQ";
import { PageCTA } from "@/components/pages/PageCTA";
import { ProcessSteps } from "@/components/pages/ProcessSteps";
import { servicePages } from "@/content/service-pages";

const page = servicePages["web-design-development"];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://everydaydigitalsolutions.com/services/web-design-development#service",
  "name": page.title,
  "description": page.seoDescription,
  "url": "https://everydaydigitalsolutions.com/services/web-design-development",
  "image": "https://everydaydigitalsolutions.com/opengraph.jpg",
  "provider": {
    "@type": "Organization",
    "@id": "https://everydaydigitalsolutions.com/#organization",
    "name": "Everyday Digital Solutions",
    "url": "https://everydaydigitalsolutions.com"
  },
  "areaServed": [
    { "@type": "City", "name": "Chandigarh" },
    { "@type": "City", "name": "Mohali" },
    { "@type": "City", "name": "Panchkula" },
    { "@type": "City", "name": "Jalandhar" },
    { "@type": "AdministrativeArea", "name": "Punjab" },
    { "@type": "Country", "name": "India" }
  ],
  "serviceType": "Web Design and Development",
  "offers": {
    "@type": "Offer",
    "url": "https://everydaydigitalsolutions.com/get-a-quote",
    "priceCurrency": "INR",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "INR",
      "minPrice": "50000",
      "description": "Bespoke, conversion-focused websites starting from ₹50,000. Final scope and price confirmed after a short discovery call."
    },
    "availability": "https://schema.org/InStock"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": page.faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

export default function WebDesignDevelopment() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        canonical={page.canonical}
        ogImageAlt="Web design and development for Tricity service businesses — Everyday Digital Solutions"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/web-design-development" },
          { name: "Web Design & Development", path: page.canonical },
        ]}
        jsonLd={[serviceSchema, faqSchema]}
      />
      <Navbar />
      <main className="bg-background min-h-[100dvh]">
        <PageHero
          tag="Service — Web Design & Development"
          headline={page.heroHeadline}
          paragraph={page.heroParagraph}
          cta={{ label: "Start a Project", href: "/contact" }}
        />

        {/* Problem / Solution */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass rounded-2xl p-8">
            <h2 className="font-serif text-xl mb-4">{page.problemHeading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{page.problemText}</p>
          </div>
          <div className="bg-[var(--accent-soft)] border border-primary/20 rounded-2xl p-8">
            <h2 className="font-serif text-xl mb-4">{page.solutionHeading}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{page.solutionText}</p>
          </div>
        </section>

        <FeatureGrid heading="Everything we build into your website" features={page.features} />

        <ProcessSteps heading="How we design and ship your site" steps={page.process} />

        {/* Industries */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-16">
          <h2 className="text-2xl font-serif mb-6 text-center">Industries we build for</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {page.industries.map((ind) => (
              <span key={ind} className="border border-border/40 rounded-full text-sm text-muted-foreground px-4 py-2">
                {ind}
              </span>
            ))}
          </div>
        </section>

        {/* Quasar case study link */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Case Study</p>
              <p className="font-serif text-lg">Quasar Salon — premium marketing site at quasarsalon.com, shipped alongside the app.</p>
            </div>
            <Link href="/work/quasar-salon" className="shrink-0 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap">
              Read the case study →
            </Link>
          </div>
        </section>

        {/* Related services */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-serif mb-6">Related services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/services/mobile-app-development" className="glass rounded-2xl p-5 hover:border-primary/60 transition-colors group">
              <p className="font-medium text-foreground mb-1 text-sm group-hover:text-primary transition-colors">Custom Mobile Apps</p>
              <p className="text-xs text-muted-foreground">Native iOS & Android apps with bookings, payments, and loyalty — shipped in 30 days.</p>
            </Link>
            <Link href="/services/automation-systems" className="glass rounded-2xl p-5 hover:border-primary/60 transition-colors group">
              <p className="font-medium text-foreground mb-1 text-sm group-hover:text-primary transition-colors">Automation & AI Systems</p>
              <p className="text-xs text-muted-foreground">WhatsApp automation, CRM integration, and n8n workflows for growing businesses.</p>
            </Link>
          </div>
        </section>

        <InlinePageFAQ items={page.faqs} />
        <PageCTA
          heading="Ready for a website that actually works?"
          subtext="Tell us about your business and we'll scope your website and get back to you within one business day."
          secondaryLabel="See our work"
          secondaryHref="/work/quasar-salon"
        />
      </main>
      <Footer />
    </>
  );
}

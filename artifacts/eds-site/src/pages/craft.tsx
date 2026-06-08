import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CaseStudy } from "@/components/CaseStudy";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://everydaydigitalsolutions.com/craft#webpage",
  url: "https://everydaydigitalsolutions.com/craft",
  name: "Craft — Everyday Digital Solutions",
  description:
    "The apps and platforms Everyday Digital Solutions has designed and built — Quasar Salon, Everywhere Transfers, Open Humana, and OneClickAssist.",
  inLanguage: "en-IN",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://everydaydigitalsolutions.com/#website",
    url: "https://everydaydigitalsolutions.com",
    name: "Everyday Digital Solutions",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://everydaydigitalsolutions.com/" },
      { "@type": "ListItem", position: 2, name: "Craft", item: "https://everydaydigitalsolutions.com/craft" },
    ],
  },
};

export default function Craft() {
  return (
    <>
      <SEO
        title="Craft — Our Work"
        description="The apps and platforms Everyday Digital Solutions has designed and built — Quasar Salon, Everywhere Transfers, Open Humana, and OneClickAssist."
        canonical="/craft"
        ogType="website"
        ogImageAlt="Craft — work by Everyday Digital Solutions"
        jsonLd={[webPageSchema]}
      />
      <Navbar />
      <main className="bg-background min-h-[100dvh] pt-8 sm:pt-12 lg:pt-24">
        <CaseStudy />
      </main>
      <Footer />
    </>
  );
}

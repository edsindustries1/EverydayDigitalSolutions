import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { DigitalCard } from "@/components/DigitalCard";
import { CardActions } from "@/components/CardActions";
import { OptimizedImage } from "@/components/OptimizedImage";
import { site } from "@/lib/constants";
import type { VCardData } from "@/lib/vcard";
import NotFound from "@/pages/not-found";

const BASE = "https://everydaydigitalsolutions.com";

interface CardProfile {
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  metaLines: string[];
  phone: string;
  email: string;
  whatsappUrl: string;
}

const PROFILES: Record<string, CardProfile> = {
  shushant: {
    slug: "shushant",
    firstName: "Shushant",
    lastName: "Bangar",
    title: "Founder & Principal Engineer",
    tagline: "Custom AI software & mobile apps for ambitious Tri-City businesses.",
    metaLines: ["Mohali", "Jalandhar", "Chandigarh", "Panchkula"],
    phone: site.phone,
    email: site.email,
    whatsappUrl: site.whatsapp,
  },
};

export default function CardPage() {
  const [, params] = useRoute<{ slug: string }>("/card/:slug");
  const slug = params?.slug ?? "shushant";
  const profile = PROFILES[slug];

  if (!profile) return <NotFound />;

  const canonical = `/card/${profile.slug}`;
  const profileUrl = `${BASE}${canonical}`;
  const fullName = `${profile.firstName} ${profile.lastName}`;

  const vcard = useMemo<VCardData>(
    () => ({
      firstName: profile.firstName,
      lastName: profile.lastName,
      title: profile.title,
      organization: site.name,
      phone: profile.phone,
      email: profile.email,
      url: profileUrl,
      address: {
        street: "Tecfin Tower, 264-265, Phase 8B, Sector 74",
        city: "Mohali",
        region: "Punjab",
        postalCode: "140307",
        country: "India",
      },
    }),
    [profile, profileUrl],
  );

  const contactLines = useMemo(
    () => [
      { label: "Call", value: profile.phone },
      { label: "Email", value: profile.email },
      { label: "Web", value: `${site.domain}` },
      { label: "Office", value: "Mohali · Jalandhar" },
    ],
    [profile],
  );

  const telHref = `tel:${profile.phone.replace(/\s+/g, "")}`;
  const mailtoHref = `mailto:${profile.email}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profileUrl}#person`,
    "name": fullName,
    "givenName": profile.firstName,
    "familyName": profile.lastName,
    "jobTitle": profile.title,
    "url": profileUrl,
    "telephone": profile.phone,
    "email": profile.email,
    "worksFor": { "@id": `${BASE}/#organization` },
    "sameAs": [
      "https://www.linkedin.com/in/shushantbangar",
    ],
  };

  return (
    <>
      <SEO
        title={`${fullName} — Digital Card`}
        description={`${profile.title}, ${site.name}. ${profile.tagline}`}
        canonical={canonical}
        ogType="website"
        jsonLd={personSchema}
      />

      <main className="relative min-h-[100dvh] flex flex-col bg-background">
        <header className="px-5 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <OptimizedImage
              src="/logo.png"
              alt={site.name}
              width={28}
              height={28}
              loading="eager"
              decoding="async"
              className="h-7 w-auto dark:invert dark:brightness-105"
            />
            <span className="font-serif text-sm text-foreground/80 group-hover:text-foreground transition-colors hidden sm:inline">
              Everyday Digital Solutions
            </span>
          </Link>
          <Link
            href="/work/quasar-salon"
            className="text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-[var(--accent)] transition-colors"
          >
            Our Work →
          </Link>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-10 sm:py-14 gap-8 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full"
          >
            <DigitalCard
              name={fullName}
              title={profile.title}
              organization={site.name}
              tagline={profile.tagline}
              logoSrc="/logo.png"
              metaLines={profile.metaLines}
              contactLines={contactLines}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="w-full"
          >
            <CardActions
              vcard={vcard}
              vcardFilename={`${profile.firstName}-${profile.lastName}`}
              qrPayload={profileUrl}
              qrLabel={profileUrl.replace(/^https?:\/\//, "")}
              telHref={telHref}
              whatsappHref={profile.whatsappUrl}
              mailtoHref={mailtoHref}
            />
          </motion.div>
        </div>

        <footer className="px-5 sm:px-8 pb-6 sm:pb-8 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground/70">
            {site.tagline} · Est. {site.founded}
          </p>
        </footer>
      </main>
    </>
  );
}

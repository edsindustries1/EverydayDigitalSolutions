/**
 * Shared Schema.org JSON-LD builders.
 *
 * These helpers exist so that LocalBusiness and Place entities stay
 * consistent across the home page, the per-city location pages, and
 * the per-locality (sector/phase) pages. Drifts between them lead
 * to confusing knowledge-graph entities in Google's index.
 */

export const SITE_BASE_URL = "https://everydaydigitalsolutions.com";
export const SITE_NAME = "Everyday Digital Solutions";
export const ORG_ID = `${SITE_BASE_URL}/#organization`;

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "10:00",
    closes: "14:00",
  },
] as const;

const SAME_AS = [
  "https://www.linkedin.com/company/everyday-digital-solutions",
  "https://www.linkedin.com/in/shushantbangar",
  "https://www.instagram.com/everydaydigitalsolutions",
  "https://g.page/everyday-digital-solutions",
  "https://wa.me/919056066006",
] as const;

export interface LocalBusinessAddressArgs {
  /** Slug-safe identifier for the @id (e.g. "chandigarh"). */
  slug: string;
  /** City name shown in the schema (e.g. "Chandigarh"). */
  city: string;
  /** Plain-English description used as `description`. */
  description: string;
  /** Optional postal address. If omitted, the Mohali HQ is used. */
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  /** Optional explicit geo coordinates. */
  geo?: { latitude: string | number; longitude: string | number };
  /** `areaServed` type — defaults to City. Use AdministrativeArea for Punjab. */
  areaServedType?: "City" | "AdministrativeArea";
}

/**
 * Builds a LocalBusiness JSON-LD scoped to a single city or region.
 * Always includes logo, image, openingHoursSpecification, priceRange,
 * sameAs, and a stable @id so search engines can dedupe entities.
 */
export function localBusinessSchema(args: LocalBusinessAddressArgs): Record<string, unknown> {
  const {
    slug,
    city,
    description,
    address,
    geo,
    areaServedType = "City",
  } = args;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_BASE_URL}/${slug}#localbusiness`,
    name: `${SITE_NAME} — ${city}`,
    url: `${SITE_BASE_URL}/${slug}`,
    image: `${SITE_BASE_URL}/opengraph.jpg`,
    logo: `${SITE_BASE_URL}/logo.png`,
    description,
    telephone: "+91-9056066006",
    email: "admin@everydaydigitalsolutions.com",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer, Card",
    address: address
      ? {
          "@type": "PostalAddress",
          streetAddress: address.streetAddress,
          addressLocality: address.addressLocality,
          addressRegion: "Punjab",
          postalCode: address.postalCode,
          addressCountry: "IN",
        }
      : {
          "@type": "PostalAddress",
          streetAddress: "Tecfin Tower, 264-265, Phase 8B, Sector 74",
          addressLocality: "Mohali",
          addressRegion: "Punjab",
          postalCode: "140307",
          addressCountry: "IN",
        },
    ...(geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: String(geo.latitude),
            longitude: String(geo.longitude),
          },
        }
      : {}),
    areaServed: {
      "@type": areaServedType,
      name: city,
    },
    openingHoursSpecification: OPENING_HOURS,
    sameAs: SAME_AS,
    parentOrganization: {
      "@type": "Organization",
      "@id": ORG_ID,
    },
  };
}

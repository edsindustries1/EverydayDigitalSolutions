import { Link } from "wouter";
import { site } from "@/lib/constants";

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ───────────────────────────────────────────────────────────────────────────
   Trimmed to roughly a third of its previous height. The saving came from
   structure, not from cutting links:

   · the two full office addresses are gone — they are still emitted in the
     homepage's LocalBusiness JSON-LD, which is what actually feeds local
     search, so no crawler loses them;
   · the separate Locations / Free Tools / Selected Work strip is folded into
     the main grid and one inline row, rather than being a second three-column
     block carrying its own headings, margins and divider;
   · the brand paragraph is gone — it restated the hero;
   · the logo's glass tile is gone; at footer scale it was chrome around a
     28px image.

   The link set is deliberately almost intact. The Locations row especially is
   internal-linking scaffolding for local SEO, so it is compressed to a single
   wrapped line rather than deleted.
   ═══════════════════════════════════════════════════════════════════════════ */

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Mobile Apps", href: "/services/mobile-app-development" },
      { label: "Web Design & Development", href: "/services/web-design-development" },
      { label: "AI Voice Agents", href: "/services/ai-voice-agents" },
      { label: "Automation Systems", href: "/services/automation-systems" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Salons & Spas", href: "/solutions/salons-and-spas" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Clinics & Healthcare", href: "/solutions/clinics-and-healthcare" },
      { label: "Restaurants & Cafes", href: "/solutions/restaurants-and-cafes" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Craft", href: "/craft" },
      { label: "Blog", href: "/blog" },
      { label: "Quasar Salon", href: "/work/quasar-salon" },
      { label: "Open Humana", href: "/work/open-humana" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "App Cost Calculator", href: "/tools/app-cost-calculator" },
      { label: "Voice Agent ROI", href: "/tools/ai-voice-agent-roi-calculator" },
      { label: "2026 App Cost Guide", href: "/resources/app-cost-guide-2026" },
    ],
  },
];

const LOCATIONS: FooterLink[] = [
  { label: "Chandigarh", href: "/chandigarh" },
  { label: "Mohali", href: "/mohali" },
  { label: "Panchkula", href: "/panchkula" },
  { label: "Jalandhar", href: "/jalandhar" },
  { label: "Punjab", href: "/punjab" },
];

const LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation & Refunds", href: "/refund" },
  { label: "Shipping & Service Delivery", href: "/shipping" },
  { label: "Pricing", href: "/pricing" },
  { label: "Cookies", href: "/cookies" },
  { label: "Contact Us", href: "/contact" },
];

const linkClass = "text-sm text-muted-foreground hover:text-foreground transition-colors";
const headingClass = "text-xs font-bold uppercase tracking-widest text-foreground/70 mb-3";

/** Attributes spread onto the <footer> so a page can place it in a themed
 *  band (the homepage passes data-band="ink") without forking the markup. */
export function Footer({ className = "", ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer {...rest} className={`border-t border-border/40 pt-10 pb-7 ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-9">

          {/* Identity, plus the two details people come to a footer for. */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit group" aria-label="Everyday Digital Solutions home">
              <img
                src="/logo.png"
                alt="Everyday Digital Solutions"
                className="w-7 h-auto"
                width={28}
                height={23}
                loading="lazy"
                decoding="async"
              />
              <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                Everyday<br />Digital Solutions
              </span>
            </Link>
            <ul className="flex flex-col gap-1.5">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} break-words`}>
                  {/* A <wbr> after the @ is the only sensible break point in a
                      narrow column; `break-all` split it mid-word. */}
                  {site.email.split("@")[0]}@<wbr />{site.email.split("@")[1]}
                </a>
              </li>
              <li><a href={`tel:${site.phone}`} className={linkClass}>{site.phone}</a></li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className={headingClass}>{col.title}</h4>
              <ul className="flex flex-col gap-1.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Locations as one wrapped line rather than a headed block. */}
        <div className="mt-9 pt-5 border-t border-border/40 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">Locations</span>
          {LOCATIONS.map((l, i) => (
            <span key={l.href} className="flex items-baseline gap-3">
              {i > 0 && <span aria-hidden="true" className="text-muted-foreground/40">·</span>}
              <Link href={l.href} className={linkClass}>{l.label}</Link>
            </span>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-border/40 flex flex-col gap-3">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1.5">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              {site.legalName} · GSTIN: {site.gstin} · Mohali, Punjab, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

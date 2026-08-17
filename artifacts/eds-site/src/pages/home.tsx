import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { EdsThread } from "@/components/eds/EdsThread";
import { EdsNav, type NavItem } from "@/components/eds/EdsNav";
import { useReveal } from "@/components/eds/useReveal";
import { useScrollMotion } from "@/components/eds/useScrollMotion";
import { KineticHero } from "@/components/eds/KineticHero";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

const A = "/renders/eds";

/* ── Content ─────────────────────────────────────────────────────────────── */

const SERVICES = [
  { img: "svc-web", t: "Web Development", d: "Custom websites and web applications built for performance and scale.", href: "/services/web-design-development" },
  { img: "svc-mobile", t: "Mobile Apps", d: "Native & cross-platform mobile apps that deliver smooth experiences.", href: "/services/mobile-app-development" },
  { img: "svc-ai", t: "AI Automation", d: "Smart automation solutions that save time and increase productivity.", href: "/services/automation-systems" },
  { img: "svc-marketing", t: "Digital Marketing", d: "Data-driven marketing strategies that generate leads and grow your brand.", href: "/contact" },
  { img: "svc-branding", t: "Branding", d: "Creative branding that builds identity and connects with your audience.", href: "/contact" },
  { img: "svc-seo", t: "SEO & Growth", d: "SEO strategies that improve rankings and drive organic traffic.", href: "/contact" },
];

const WHY = [
  ["Own the customer relationship.", "Your Instagram audience belongs to Meta. Your app audience belongs to you — push notifications land on the home screen, no algorithm tax."],
  ["Retention compounds.", "App users return three times more often than mobile-web visitors. Loyalty works because the app remembers."],
  ["Premium signals trust.", "Being on the App Store says serious brand. Customers trust an installed app the way they trust a storefront."],
  ["Friction-free bookings.", "One tap to book, one tap to pay. No phone tag, no WhatsApp at 11 PM, no double-bookings."],
];

const PILLARS = [
  {
    img: "pillar-apps", t: "Custom Mobile Apps", s: "App Store-grade. Built around your brand.",
    items: ["Native iOS & Android app", "Appointment booking & scheduling", "In-app payments", "Loyalty & rewards programme", "Push notification campaigns", "App Store & Play Store submission", "Staff & admin dashboard", "Dedicated senior team throughout"],
    cta: "Book a Free Consultation", href: "/services/mobile-app-development",
  },
  {
    img: "pillar-voice", t: "AI Voice Agents", s: "A senior salesperson who never sleeps.",
    items: ["Hindi, English & Punjabi voices", "Inbound lead qualification", "Outbound follow-up campaigns", "CRM auto-logging", "Calendar & appointment booking", "24/7 availability", "Custom scripts & personas", "Live monitoring dashboard"],
    cta: "Book a Free Consultation", href: "/services/ai-voice-agents",
  },
  {
    img: "pillar-automation", t: "Automation & AI Systems", s: "Systematic. Reliable. Always on.",
    items: ["WhatsApp Business API workflows", "CRM pipeline automation", "Email & calendar integration", "Custom AI agents", "n8n visual workflow builder", "Error alerts & monitoring", "End-to-end data flow", "Fixed-price, fully managed"],
    cta: "Book a Free Consultation", href: "/services/automation-systems",
  },
];

const STAGES = [
  ["Scope", "A 15-minute call, then a fixed written proposal. No ambiguity, no hourly billing."],
  ["Design", "Screens designed to your brand, not a template. You sign off before a line is written."],
  ["Build", "Senior-led development with a working build you can open every week."],
  ["Ship", "Store submission, review handling and launch. We carry it through review, however long that takes."],
];


const NAV: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "/blog", external: true },
  { label: "Contact", href: "#contact" },
];

/* ── Small pieces ────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eds-eyebrow">{children}</p>;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://everydaydigitalsolutions.com/#organization",
  "name": "Everyday Digital Solutions",
  "url": "https://everydaydigitalsolutions.com",
  "logo": "https://everydaydigitalsolutions.com/logo.png",
  "image": "https://everydaydigitalsolutions.com/opengraph.jpg",
  "description": "Senior-led custom software, AI voice agents, and automation systems for ambitious service businesses worldwide. Studio based in Mohali, Punjab, serving clients across India, the United States, and Canada — built by a senior team, start to finish.",
  "telephone": "+91-9056066006",
  "email": "admin@everydaydigitalsolutions.com",
  "priceRange": "₹₹",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    }
  ],
  "foundingDate": "2018",
  "founder": {
    "@type": "Person",
    "name": "Shushant Bangar"
  },
  "areaServed": [
    { "@type": "City", "name": "Chandigarh" },
    { "@type": "City", "name": "Mohali" },
    { "@type": "City", "name": "Panchkula" },
    { "@type": "City", "name": "Jalandhar" },
    { "@type": "AdministrativeArea", "name": "Punjab" },
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "Canada" }
  ],
  "location": [
    {
      "@type": "Place",
      "name": "Everyday Digital Solutions — Mohali",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tecfin Tower, 264-265, Phase 8B, Sector 74, Sahibzada Ajit Singh Nagar",
        "addressLocality": "Mohali",
        "addressRegion": "Punjab",
        "postalCode": "140307",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.7046",
        "longitude": "76.7207"
      }
    },
    {
      "@type": "Place",
      "name": "Everyday Digital Solutions — Jalandhar",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SCO 210, Silver Plaza Complex, Sodal Road",
        "addressLocality": "Jalandhar",
        "addressRegion": "Punjab",
        "postalCode": "144004",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "31.3256",
        "longitude": "75.5727"
      }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software & AI Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Mobile App Development",
          "description": "Native iOS & Android mobile apps for service businesses — bookings, payments, loyalty programmes, push notifications. App Store & Play Store deployment handled end-to-end."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Voice Agents",
          "description": "Automated inbound and outbound AI calling agents in Hindi, English & Punjabi with CRM and calendar integration. Never miss a lead again."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Business Automation & AI Systems",
          "description": "Custom workflow automation connecting WhatsApp, CRM, email, and calendar with AI agents. Built on n8n, Twilio, and OpenAI."
        }
      }
    ]
  },
  "sameAs": [
    "https://www.linkedin.com/company/everyday-digital-solutions",
    "https://wa.me/919056066006"
  ]
};

const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://everydaydigitalsolutions.com/#organization-rating",
  "name": "Everyday Digital Solutions",
  "url": "https://everydaydigitalsolutions.com",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "1",
    "reviewCount": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Organization", "name": "Quasar Salon", "url": "https://quasarsalon.com" },
      "reviewBody": "We didn't just get an app. We got a technology partner who understood our business — and shipped in a month. Mobile app and marketing site, both delivered on time."
    }
  ]
};

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function Home() {
  useReveal();
  useScrollMotion();
  const [active, setActive] = useState("Home");
  const railRef = useRef<HTMLDivElement>(null);

  // Nav hides on scroll down, returns on scroll up. Hero render drifts.
  useEffect(() => {
    let last = 0, raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        last = y;
        // Active section = the last heading whose top has passed the fold line.
        let cur = "Home";
        for (const it of NAV) {
          if (!it.href.startsWith("#") || it.href === "#top") continue;
          const el = document.querySelector(it.href);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.42) cur = it.label;
        }
        setActive(cur);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);


  const scrollRail = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 232, behavior: "smooth" });
  };

  return (
    <div className="eds-home" style={{ position: "relative", overflowX: "clip" }}>
      <SEO
        title="Everyday Digital Solutions — Senior-Led Product Studio · Native iOS & Android for Premium Brands"
        description="A senior-led product studio building native iOS and Android apps for premium service brands across India, the US, and Canada. Designed, engineered and shipped by the same people who pitched you. Backed by AI voice agents and automation systems."
        canonical="/"
        ogImageAlt="Everyday Digital Solutions — premium app development studio for the App Store and Play Store"
        jsonLd={[localBusinessSchema, aggregateRatingSchema]}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground"
      >
        Skip to content
      </a>

      <EdsThread />

      <EdsNav items={NAV} active={active} />

      <main id="main-content">

      <KineticHero />

      {/* ── Services ── */}
      <section id="services" style={{ padding: "64px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="eds-reveal" style={{ textAlign: "center" }} data-thread data-thread-x="0.5">
            <Eyebrow>What we do</Eyebrow>
            <h2>Complete Digital Solutions</h2>
            <p className="eds-lede" style={{ margin: "16px auto 0", maxWidth: 460, fontSize: 17 }}>
              End-to-end digital services to transform your ideas into powerful digital experiences.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, margin: "8px 4px 18px" }}>
            <button type="button" className="eds-rail-btn" onClick={() => scrollRail(-1)} aria-label="Previous services">←</button>
            <button type="button" className="eds-rail-btn" onClick={() => scrollRail(1)} aria-label="Next services">→</button>
          </div>
          <div className="eds-rail" ref={railRef}>
            {SERVICES.map((s, i) => (
              <Link key={s.t} href={s.href} className="eds-card eds-reveal" style={{ width: 196, display: "flex", flexDirection: "column", transitionDelay: `${i * 60}ms` }}>
                <img src={`${A}/${s.img}.webp`} alt="" loading="lazy" width={192} height={118} />
                <div style={{ padding: "4px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: 16.5, margin: 0 }}>{s.t}</h3>
                  <p style={{ margin: "7px 0 14px", fontSize: 13, lineHeight: 1.55, color: "var(--text-muted)" }}>{s.d}</p>
                  <span style={{ marginTop: "auto", alignSelf: "flex-end", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: 14, boxShadow: "var(--sh-chip)" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why now ── */}
      <section style={{ padding: "64px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }} className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
          <div className="eds-reveal" data-thread data-thread-x="0.26">
            <Eyebrow>Why now</Eyebrow>
            <h2>The brands winning 2026 own a place on their customer’s home screen.</h2>
            <p className="eds-lede" style={{ margin: "20px 0 0", fontSize: 17 }}>
              Social platforms rent you attention. An app earns it. For premium service brands, the App Store is no
              longer a nice-to-have — it’s the most direct line you have to your best customers.
            </p>
            <div style={{ marginTop: 28 }} className="grid gap-7 sm:gap-x-8 sm:grid-cols-2">
              {WHY.map(([t, d]) => (
                <div key={t}>
                  <h4 style={{ margin: 0, fontSize: 16.5, fontWeight: 700 }}>{t}</h4>
                  <p style={{ margin: "7px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "var(--text-muted)" }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="eds-well eds-reveal">
            <img src={`${A}/why-crm.webp`} alt="Miniature model of a CRM routing leads from a jobsite to a dashboard" loading="lazy" width={1024} height={1536} style={{ display: "block", width: "100%" }} />
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section id="pillars" data-band="ink" style={{ padding: "64px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eds-reveal" data-thread data-thread-x="0.64">
            <Eyebrow>Our pillars</Eyebrow>
            <h2 style={{ maxWidth: 640 }}>One studio. Three pillars. Apps are the heart.</h2>
            <p className="eds-lede" style={{ margin: "18px 0 0", maxWidth: 620, fontSize: 17 }}>
              Premium iOS and Android apps are what we lead with. AI voice agents and automation systems extend the
              surface area — handling calls, follow-up and back-office work the moment your app goes live.
            </p>
          </div>
          <div style={{ marginTop: 32 }} className="grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.t} className="eds-card eds-reveal" style={{ display: "flex", flexDirection: "column", transitionDelay: `${i * 90}ms` }}>
                <img src={`${A}/${p.img}.webp`} alt="" loading="lazy" width={1000} height={667} />
                <div style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{p.t}</h3>
                  <p style={{ margin: "6px 0 18px", fontSize: 14, color: "var(--accent)", fontWeight: 500 }}>{p.s}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 9, flex: 1 }}>
                    {p.items.map((it) => (
                      <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, color: "var(--text-secondary)" }}>
                        <span style={{ flex: "none", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 7 }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {/* No published price. A studio quoting against scope does not
                      advertise an entry number — it anchors the conversation low
                      and invites comparison shopping. The call qualifies instead. */}
                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--hairline)" }}>
                    <Link href={p.href} style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14.5 }}>{p.cta} →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="eds-reveal" style={{ margin: "28px 0 0", fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>
            Also under this roof: Web Design &amp; Development · Branding · SEO &amp; Digital Marketing · E-commerce ·
            CRM &amp; Lead Generation · Maintenance &amp; Support
          </p>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" style={{ padding: "64px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eds-reveal" style={{ textAlign: "center" }} data-thread data-thread-x="0.5">
            <Eyebrow>Selected work</Eyebrow>
            <h2>In their own words.</h2>
          </div>
          <div className="eds-card eds-reveal" style={{ marginTop: 32 }}>
            <div className="lg:grid lg:grid-cols-2 lg:items-center">
              <div style={{ background: "var(--bg-alt)" }}>
                <img src={`${A}/work-quasar.webp`} alt="Miniature model of the Quasar Salon booking app" loading="lazy" width={1200} height={800} style={{ display: "block", width: "100%" }} />
              </div>
              <div style={{ padding: "clamp(28px, 4vw, 52px)" }}>
                <blockquote style={{ margin: 0, fontSize: "clamp(1.1rem, 1.9vw, 1.5rem)", lineHeight: 1.45, fontWeight: 600, letterSpacing: "-0.02em" }}>
                  “We didn’t just get an app. We got a technology partner who understood our business — and shipped in a month.”
                </blockquote>
                <p style={{ margin: "18px 0 0", fontSize: 14.5, color: "var(--text-muted)" }}>Founder, Quasar Salon — Mohali</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "22px 0 0" }}>
                  {["Mobile App", "Marketing Website"].map((c) => (
                    <span key={c} style={{ background: "var(--bg-alt)", borderRadius: 999, padding: "7px 14px", fontSize: 13, color: "var(--text-secondary)" }}>{c}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 24 }}>
                  <a href="https://quasarsalon.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600, fontSize: 15 }}>Visit quasarsalon.com →</a>
                  <Link href="/work/quasar-salon" style={{ fontWeight: 600, fontSize: 15 }}>Read the case study</Link>
                </div>
                <p style={{ margin: "20px 0 0", fontSize: 13, color: "var(--text-muted)" }}>Live on the App Store.</p>
              </div>
            </div>
          </div>
          <p className="eds-reveal" style={{ margin: "22px 0 0", fontSize: 14, color: "var(--text-muted)", textAlign: "center" }}>
            More client work coming as projects ship — we only publish what’s real.
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" style={{ marginTop: 64, background: "var(--bg-alt)", padding: "64px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eds-reveal" style={{ textAlign: "center" }} data-thread data-thread-x="0.5">
            <Eyebrow>Our process</Eyebrow>
            <h2>A clear path from idea to live product.</h2>
            <p className="eds-lede" style={{ margin: "16px auto 0", maxWidth: 520, fontSize: 17 }}>
              A fixed scope and a delivery date agreed before we start — and held. The thread moves as you scroll, the
              same way work moves through our studio.
            </p>
          </div>
          <ol style={{ marginTop: 32, padding: 0, listStyle: "none" }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STAGES.map(([t, d], i) => (
              <li key={t} className="eds-reveal" style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 20, padding: "24px 24px 26px", transitionDelay: `${i * 90}ms` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="eds-stat-ring"><i /></span>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>Step {i + 1}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 19 }}>{t}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "var(--text-muted)" }}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "64px 24px 0", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }} className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
          <div className="eds-well eds-reveal">
            <img src={`${A}/about-studio.webp`} alt="Miniature model of the Everyday Digital Solutions studio floor" loading="lazy" width={1200} height={1200} style={{ display: "block", width: "100%" }} />
          </div>
          <div className="eds-reveal" data-thread data-thread-x="0.5">
            <Eyebrow>About the studio</Eyebrow>
            <p className="eds-lede" style={{ margin: "4px 0 0", fontSize: 17 }}>
              Hi, I’m Shushant, founder of Everyday Digital Solutions. Since 2018 we’ve built software for service
              businesses out of Mohali: mobile apps, websites, AI voice agents that answer and qualify calls on their
              own, and automation systems that handle the repetitive half of a business. The studio is deliberately
              small and senior-only — no juniors learning on your budget, no account managers relaying messages between
              you and the people actually building. That’s why projects ship in 30 to 60 days instead of six months.
            </p>
            <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)" }}>
              Four industries make up most of our work: salons and spas, real estate, clinics and restaurants. Different
              businesses, same underlying problem — a phone nobody has time to answer, bookings held together by
              WhatsApp and a notebook, and customer relationships that live in one staff member’s head instead of in the
              business. We build the system that fixes it, then hand you something you own outright.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" data-band="ink" style={{ padding: "64px 24px 72px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", textAlign: "center" }} className="eds-reveal" data-thread data-thread-x="0.5">
          <Eyebrow>Let’s build</Eyebrow>
          <h2>Ready to build something exceptional?</h2>
          <p className="eds-lede" style={{ margin: "18px auto 0", maxWidth: 560, fontSize: 17 }}>
            Tell us what you’re building. We’ll scope it on a 15-minute call and send you a clear, fixed proposal —
            no ambiguity, no surprises.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <Link href="/contact" className="eds-btn">Start Your Project<span className="eds-arrow">→</span></Link>
            <a href="https://wa.me/919056066006" target="_blank" rel="noopener noreferrer" className="eds-btn-2">WhatsApp Us</a>
          </div>
        </div>
      </section>

      </main>

      {/* The shared footer — every page link, the legal nav and the
          registration line already live here. The homepage used to carry its
          own two-paragraph stub, which is why none of that was reachable
          from the landing page. */}
      <Footer data-band="ink" />
    </div>
  );
}

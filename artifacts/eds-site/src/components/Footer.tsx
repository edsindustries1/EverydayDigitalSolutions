import { Link } from "wouter";
import { site } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/40 pt-14 pb-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 mb-12 lg:mb-20">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit" aria-label="Everyday Digital Solutions home">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass-elevated relative overflow-hidden flex-shrink-0 group-hover:border-primary transition-colors">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(120% 80% at 50% 0%, var(--accent-soft), transparent 65%)" }}
                />
                <img
                  src="/logo.png"
                  alt="Everyday Digital Solutions"
                  className="relative z-10 max-w-[70%] max-h-[70%] w-auto h-auto object-contain dark:invert dark:brightness-105"
                  width={28}
                  height={23}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors leading-snug">
                Everyday<br />Digital Solutions
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Custom apps, AI voice agents, and automation systems for ambitious service businesses. Built in Mohali — shipping across India and beyond.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-base lg:text-lg mb-5">Studio</h4>
            <ul className="flex flex-col gap-4 md:gap-3">
              <li><a href="/#work" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Work</a></li>
              <li><a href="/#process" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Process</a></li>
              <li><a href="/#about" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><Link href="/blog" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="/#faq" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base lg:text-lg mb-5">Services</h4>
            <ul className="flex flex-col gap-4 md:gap-3">
              <li><Link href="/services/mobile-app-development" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services/ai-voice-agents" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">AI Voice Agents</Link></li>
              <li><Link href="/services/automation-systems" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Automation</Link></li>
              <li><Link href="/get-a-quote" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base lg:text-lg mb-5">Solutions</h4>
            <ul className="flex flex-col gap-4 md:gap-3">
              <li><Link href="/solutions/salons-and-spas" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Salons &amp; Spas</Link></li>
              <li><Link href="/solutions/real-estate" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Real Estate</Link></li>
              <li><Link href="/solutions/clinics-and-healthcare" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Clinics &amp; Healthcare</Link></li>
              <li><Link href="/solutions/restaurants-and-cafes" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Restaurants &amp; Cafes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base lg:text-lg mb-5">Get in touch</h4>
            <ul className="flex flex-col gap-4 md:gap-3">
              <li>
                <Link href="/contact" data-float="" className="text-base md:text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                  Start a Project
                </Link>
              </li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a></li>
              <li><a href={`mailto:${site.email}`} className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors break-all">{site.email}</a></li>
              <li><a href={`tel:${site.phone}`} className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">{site.phone}</a></li>
            </ul>
          </div>
        </div>

        {/* Locations + Resources strip — important internal links for SEO crawl + topical authority. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 pb-12 border-b border-border/40">
          <div>
            <h4 className="font-serif text-base mb-4">Locations</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              <li><Link href="/chandigarh" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Chandigarh</Link></li>
              <li><Link href="/mohali" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Mohali</Link></li>
              <li><Link href="/panchkula" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Panchkula</Link></li>
              <li><Link href="/jalandhar" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Jalandhar</Link></li>
              <li><Link href="/punjab" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Punjab</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-base mb-4">Free Tools</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/tools/app-cost-calculator" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">App Cost Calculator</Link></li>
              <li><Link href="/tools/ai-voice-agent-roi-calculator" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Voice Agent ROI Calculator</Link></li>
              <li><Link href="/resources/app-cost-guide-2026" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">2026 App Cost Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-base mb-4">Selected Work</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/work/quasar-salon" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Quasar Salon — Mobile App</Link></li>
              <li><Link href="/work/open-humana" className="text-base md:text-sm text-muted-foreground hover:text-foreground transition-colors">Open Humana — AI Dialler SaaS</Link></li>
            </ul>
          </div>
        </div>

        {/* Offices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 pb-12 border-b border-border/40">
          {site.offices.map((office, idx) => (
            <div key={idx}>
              <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{office.city}</h5>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                {office.address.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </address>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Everyday Digital Solutions. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </nav>
          <p className="text-xs text-muted-foreground">
            AI &amp; Custom Software Studio · Mohali, Punjab, India
          </p>
        </div>
      </div>
    </footer>
  );
}

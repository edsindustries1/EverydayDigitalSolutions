import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  deliverables: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We didn't just get an app. We got a technology partner who understood our business — and shipped in a month.",
    author: "Owner",
    role: "Founder",
    company: "Quasar Salon — Mohali",
    initials: "QS",
    rating: 5,
    deliverables: ["Mobile App", "Marketing Website"],
    liveUrl: "https://quasarsalon.com",
    caseStudyUrl: "/work/quasar-salon",
  },
];

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();
  const featured = testimonials[0];

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardFade = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-12 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          What our clients say
        </p>
        <h2 className="text-4xl md:text-5xl font-serif mb-4">
          In their <em className="text-primary italic">own words</em>.
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Real words from the people we build for. No paid reviews, no stock quotes.
        </p>
      </motion.div>

      <motion.figure
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={cardFade}
        className="relative bg-card border border-border/40 rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--accent-soft)_0%,transparent_65%)] opacity-30 pointer-events-none" />
        <Quote
          aria-hidden="true"
          className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 text-primary/15"
        />

        <div className="relative z-10">
          <div
            className="flex items-center gap-1 mb-6"
            aria-label={`${featured.rating} out of 5 stars`}
          >
            {Array.from({ length: featured.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-primary"
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-foreground leading-snug mb-10">
            "{featured.quote}"
          </blockquote>

          <figcaption className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-[var(--accent-soft)] border border-primary/30 flex items-center justify-center text-primary font-serif text-base flex-shrink-0"
              >
                {featured.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {featured.role}, {featured.company}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Built by Everyday Digital Solutions
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              {featured.deliverables.map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/30 border border-border/40 px-2.5 py-1 rounded-full"
                >
                  {d}
                </span>
              ))}
            </div>
          </figcaption>

          {(featured.liveUrl || featured.caseStudyUrl) && (
            <div className="flex flex-wrap gap-3 mt-8">
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-glass-primary px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Visit quasarsalon.com <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {featured.caseStudyUrl && (
                <Link
                  href={featured.caseStudyUrl}
                  className="inline-flex items-center gap-2 btn-glass-neutral text-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read the case study
                </Link>
              )}
            </div>
          )}
        </div>
      </motion.figure>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        className="mt-10 text-center text-xs text-muted-foreground"
      >
        More client work coming as projects ship — we only publish what's real.
      </motion.div>
    </section>
  );
}

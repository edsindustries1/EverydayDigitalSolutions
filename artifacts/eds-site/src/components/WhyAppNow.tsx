import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Smartphone, Repeat, Award, Zap } from "lucide-react";

const reasons = [
  {
    icon: Smartphone,
    title: "Own the customer relationship.",
    body: "Your Instagram audience belongs to Meta. Your app audience belongs to you. Direct push notifications land on the home screen — no algorithm tax, no boosted-post bidding war."
  },
  {
    icon: Repeat,
    title: "Retention compounds.",
    body: "App users return three times more often than mobile-web visitors. Loyalty programmes work because the app remembers — not because the customer has to."
  },
  {
    icon: Award,
    title: "Premium signals trust.",
    body: "Being on the App Store says serious brand. Discerning customers trust an installed app the way they trust a storefront on the high street — not a link in a DM."
  },
  {
    icon: Zap,
    title: "Friction-free bookings.",
    body: "One tap to book, one tap to pay. No phone tag, no WhatsApp at 11 PM, no double-bookings. The faster the path from intent to confirmation, the more revenue you keep."
  }
];

export function WhyAppNow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-now"
      className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-12 lg:mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Why now
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-5">
          The brands winning 2026 own a place on their <em className="text-primary italic">customer's home screen</em>.
        </h2>
        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
          Social platforms rent you attention. An app earns it. For premium service brands, the App Store is no longer a nice-to-have — it's the most direct line you have to your best customers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-float=""
              className="glass rounded-2xl p-6 lg:p-7 flex flex-col gap-4 transition-transform"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="font-serif text-lg lg:text-xl text-foreground leading-snug">
                  {reason.title}
                </h3>
              </div>
              <p className="text-sm lg:text-[0.95rem] text-muted-foreground leading-relaxed">
                {reason.body}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border/40 rounded-2xl p-6 lg:p-8"
      >
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-1">The long read</p>
          <p className="font-serif text-lg lg:text-xl text-foreground leading-snug">
            Why premium brands need an app in 2026 — and what to ship first.
          </p>
        </div>
        <Link
          href="/blog/why-premium-brands-need-an-app-in-2026"
          data-float=""
          className="shrink-0 inline-flex items-center gap-2 btn-glass-neutral text-foreground px-5 py-3 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Read the full piece →
        </Link>
      </motion.div>
    </section>
  );
}

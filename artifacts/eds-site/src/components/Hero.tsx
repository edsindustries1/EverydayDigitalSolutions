import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform, animate } from "framer-motion";
import { Check } from "lucide-react";
import { canUseWebGL } from "@/lib/canUseWebGL";

const CYCLING_VERTICALS = ["salons", "clinics", "restaurants", "clubs", "businesses"] as const;

function CyclingWord({ words, intervalMs = 2600 }: { words: readonly string[]; intervalMs?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => window.clearInterval(id);
  }, [words.length, intervalMs, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <em className="text-primary font-serif italic">{words[words.length - 1]}</em>;
  }

  return (
    <span className="relative inline-block align-baseline" style={{ minWidth: "6.5ch" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.em
          key={words[index]}
          className="text-primary font-serif italic inline-block"
          initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.35em", filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {words[index]}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

function CountUpNumber({ to, durationMs = 1400, suffix = "" }: { to: number; durationMs?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const mv = useMotionValue(prefersReducedMotion ? to : 0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  const [text, setText] = useState(`${prefersReducedMotion ? to : 0}${suffix}`);

  useEffect(() => rounded.on("change", setText), [rounded]);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(mv, to, { duration: durationMs / 1000, ease: [0.215, 0.61, 0.355, 1] });
    return controls.stop;
  }, [inView, to, durationMs, mv, prefersReducedMotion]);

  return <span ref={ref}>{text}</span>;
}

const GlassLens = lazy(() =>
  import("@/components/GlassLens").then((m) => ({ default: m.GlassLens }))
);

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [showGlassLens] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return canUseWebGL();
  });

  // Entrance shares the hover-lift vocabulary: y -12 → 0 with power3.out
  // timing. Each glass element lands into place with the same physics that
  // the GlassFloat hover uses on the way up.
  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } }
  };
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <section className="pt-8 pb-16 sm:pt-12 md:pt-16 lg:pt-28 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-16 items-start"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.div variants={variants} className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs font-medium tracking-wide text-muted-foreground mb-6 lg:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>App Store + Play Store · 30-day delivery · taking 2026 clients</span>
          </motion.div>
          <motion.h1 variants={variants} className="font-serif leading-[1.1] text-foreground mb-6 lg:mb-8" style={{ fontSize: 'clamp(2.2rem, 6vw + 0.5rem, 5.25rem)' }}>
            Premium iOS &amp; Android apps for Tricity's most ambitious <CyclingWord words={CYCLING_VERTICALS} />.
          </motion.h1>
          <motion.p variants={variants} className="text-base lg:text-lg text-muted-foreground mb-8 lg:mb-10 max-w-2xl leading-relaxed">
            Native apps, shipped to the App Store and Play Store in 30 days — designed to your brand, not a template. Backed by AI voice agents and automation systems when you want the full studio.
          </motion.p>
          <motion.div variants={variants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/contact"
              data-float=""
              className="w-full sm:w-auto text-center btn-glass-primary px-6 py-3.5 sm:py-3 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start a Project
            </Link>
            <a
              href="#work"
              data-float=""
              className="w-full sm:w-auto text-center glass text-foreground px-6 py-3.5 sm:py-3 rounded-full font-medium hover:brightness-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the Quasar app
            </a>
          </motion.div>
        </div>

        <motion.div variants={variants} className="flex flex-col gap-6 lg:pl-10 lg:border-l border-border/40 pt-6 lg:pt-0 border-t lg:border-t-0 border-border/40 min-w-0">
          {/* Mini app preview — desktop only */}
          <div className="hidden lg:block">
            <div className="glass-elevated rounded-xl relative overflow-hidden">
              {showGlassLens && (
                <Suspense fallback={null}>
                  <GlassLens />
                </Suspense>
              )}
              <div className="relative p-5" style={{ zIndex: 2 }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Quasar Salon · App</span>
                  <span className="flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-xl border border-border/40">
                    <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground">Appointment confirmed</div>
                      <div className="text-[10px] text-muted-foreground">Today, 3:00 PM · Harpreet S.</div>
                    </div>
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-xl border border-border/40 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-foreground">New booking request</div>
                      <div className="text-[10px] text-muted-foreground">Tomorrow, 11:00 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 bg-background rounded-xl border border-border/40 opacity-40">
                    <div className="w-6 h-6 rounded-full bg-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-foreground">Loyalty reward earned</div>
                      <div className="text-[10px] text-muted-foreground">240 pts · Manpreet K.</div>
                    </div>
                  </div>
                </div>
                <div className="w-full py-2 bg-primary rounded-full text-center text-[11px] font-bold text-black tracking-wide">
                  Book Now
                </div>
                <a
                  href="https://apps.apple.com/app/id6769149189"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[10px] text-muted-foreground hover:text-foreground transition-colors mt-2"
                >
                  Shipped in 30 days · Live on the App Store →
                </a>
              </div>
            </div>
          </div>

          {/* Stats — each tile is a glass surface that lifts + refracts on hover */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-4">
            <div className="glass flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl">
              <span className="text-2xl lg:text-3xl font-serif text-primary tabular-nums">
                <CountUpNumber to={30} suffix=" days" />
              </span>
              <span className="text-xs lg:text-sm text-muted-foreground">Average delivery</span>
            </div>
            <div className="glass flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl">
              <span className="text-2xl lg:text-3xl font-serif text-primary tabular-nums">
                <CountUpNumber to={2} durationMs={900} />
              </span>
              <span className="text-xs lg:text-sm text-muted-foreground">In-house products built</span>
            </div>
            <div className="glass flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl">
              <span className="text-2xl lg:text-3xl font-serif text-primary">Mohali</span>
              <span className="text-xs lg:text-sm text-muted-foreground">Studio &amp; home base</span>
            </div>
            <div className="glass flex flex-col gap-1 lg:gap-2 p-3 lg:p-4 rounded-xl">
              <span className="text-2xl lg:text-3xl font-serif text-primary tabular-nums">
                <CountUpNumber to={2018} durationMs={1800} />
              </span>
              <span className="text-xs lg:text-sm text-muted-foreground">Founded · 7 years building</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

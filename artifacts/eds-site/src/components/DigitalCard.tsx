import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";

interface DigitalCardProps {
  name: string;
  title: string;
  organization: string;
  tagline: string;
  logoSrc: string;
  metaLines: string[];
  contactLines: { label: string; value: string }[];
}

export function DigitalCard({
  name,
  title,
  organization,
  tagline,
  logoSrc,
  metaLines,
  contactLines,
}: DigitalCardProps) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto select-none">
      <div style={{ perspective: "2800px" }} className="relative w-full">
        <motion.button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Show front of card" : "Show back of card"}
          className="relative w-full aspect-[5/8] rounded-[2rem] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.23, 1, 0.32, 1] }
          }
        >
          <CardFace position="front">
            <div className="flex flex-col items-center text-center pt-1.5">
              <CornerMarks />
              <span className="text-[0.62rem] uppercase tracking-[0.32em] font-semibold text-[var(--accent)]">
                Digital Card
              </span>
            </div>

            <div className="flex flex-col items-center text-center px-2">
              <LogoGlow>
                <OptimizedImage
                  src={logoSrc}
                  alt={organization}
                  width={96}
                  height={96}
                  loading="eager"
                  decoding="async"
                  className="relative h-20 w-auto dark:invert dark:brightness-105"
                />
              </LogoGlow>
              <h2 className="font-serif text-[1.65rem] sm:text-[1.85rem] leading-[1.1] text-foreground mt-5">
                {organization}
              </h2>
              <div className="mt-3 mx-auto flex items-center justify-center gap-2 opacity-80">
                <span className="h-[1px] w-6 bg-[var(--accent)]" />
                <span className="text-[0.62rem] uppercase tracking-[0.28em] text-[var(--accent)] font-semibold">
                  Est. 2018
                </span>
                <span className="h-[1px] w-6 bg-[var(--accent)]" />
              </div>
              <p className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                AI &amp; Custom Software Studio
              </p>
            </div>

            <div className="flex flex-col items-center text-center w-full px-2">
              <h3 className="font-serif italic text-[1.5rem] sm:text-[1.65rem] leading-tight text-foreground">
                {name}
              </h3>
              <p className="mt-1 text-[0.78rem] sm:text-[0.85rem] text-muted-foreground tracking-wide">
                {title}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground/70">
                <span className="inline-block w-1 h-1 rounded-full bg-[var(--accent)]" />
                Tap to flip
                <span className="inline-block w-1 h-1 rounded-full bg-[var(--accent)]" />
              </span>
            </div>
          </CardFace>

          <CardFace position="back">
            <div className="flex flex-col items-center text-center pt-1.5">
              <CornerMarks />
              <OptimizedImage
                src={logoSrc}
                alt={organization}
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                className="h-9 w-auto dark:invert dark:brightness-105"
              />
            </div>

            <p className="font-serif text-[1.25rem] sm:text-[1.4rem] leading-snug text-center text-foreground px-2 italic">
              "{tagline}"
            </p>

            <div className="w-full flex flex-col gap-2.5 text-left px-1">
              {contactLines.map((c) => (
                <div key={c.label} className="flex items-baseline gap-3">
                  <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[var(--accent)] font-semibold min-w-[3.5rem]">
                    {c.label}
                  </span>
                  <span className="text-[0.85rem] sm:text-[0.92rem] text-foreground font-medium tracking-wide break-all">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="flex items-center gap-2 opacity-70">
                <span className="h-[1px] w-5 bg-[var(--accent)]" />
                <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[var(--accent)] font-semibold">
                  Tri-City
                </span>
                <span className="h-[1px] w-5 bg-[var(--accent)]" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                {metaLines.map((line) => (
                  <span
                    key={line}
                    className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </CardFace>
        </motion.button>
      </div>
    </div>
  );
}

function CardFace({
  position,
  children,
}: {
  position: "front" | "back";
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 glass-elevated rounded-[2rem] overflow-hidden flex flex-col items-center justify-between p-7 sm:p-9"
      style={{
        transform: position === "back" ? "rotateY(180deg)" : undefined,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, var(--accent-soft), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)",
          opacity: 0.55,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
        {children}
      </div>
    </div>
  );
}

function LogoGlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl opacity-80"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-soft), transparent 70%)",
          transform: "scale(1.8)",
        }}
      />
      {children}
    </div>
  );
}

function CornerMarks() {
  const cornerClass =
    "absolute w-3 h-3 border-[var(--accent)] opacity-50";
  return (
    <>
      <span className={`${cornerClass} top-4 left-4 border-t border-l`} aria-hidden />
      <span className={`${cornerClass} top-4 right-4 border-t border-r`} aria-hidden />
      <span className={`${cornerClass} bottom-4 left-4 border-b border-l`} aria-hidden />
      <span className={`${cornerClass} bottom-4 right-4 border-b border-r`} aria-hidden />
    </>
  );
}

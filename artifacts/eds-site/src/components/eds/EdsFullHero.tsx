import { useEffect, useRef, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   EDS FULL HERO
   ───────────────────────────────────────────────────────────────────────────
   Full-viewport render with the headline floating directly on it and a
   scroll-driven zoom.

   Three things decide whether this reads as premium or cheap:

   · Resolution. A full-bleed image is the one place a site cannot hide
     softness, so the plate is served via srcset up to the render's native
     2752px and never upscaled past it.
   · The zoom must not expose an edge. The plate is oversized from the start
     (BASE_SCALE) rather than scaled up from 1, so growth eats into existing
     overscan instead of revealing background.
   · Legibility. No wash over the render — the plate is shown clean, and the
     copy carries its own contrast through weight and a soft text shadow
     instead. That keeps the art fully visible at the cost of some contrast
     latitude, which is the deliberate trade here.
   ═══════════════════════════════════════════════════════════════════════════ */

const SRC = "/renders/eds/hero-office-full";

/** The plate starts slightly oversized so the zoom has headroom to grow into. */
const BASE_SCALE = 1.06;
/** Additional scale across one viewport of scroll. */
const ZOOM = 0.16;

/** 24px blurred plate, inlined — gives the hero its colour on the first frame
 *  instead of a flash of empty background while the full image decodes. */
const LQIP =
  "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAACQAwCdASoYAA0APu1iqk2ppaQiMAgBMB2JQBOgBCHjuYIfYugAAP5SzWEVYksLJpqptoFi5C34wmP6XjdFrkstcUF55uJ5gt0PK16X8FQnWuKqi799sAAA";

/* Glass at rest — the most readable state — and at full scroll, where the pane
 * has clarified to almost nothing on its way out. */
const GLASS_REST = { fill: 0.42, blur: 22, edge: 0.62 };
const GLASS_GONE = { fill: 0.06, blur: 3, edge: 0.10 };

export function EdsFullHero({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  const hostRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const plate = plateRef.current;
    if (!host || !plate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = -1;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = host.getBoundingClientRect();
      if (r.bottom < 0) return;

      // 0 at rest, 1 once a full viewport has been scrolled past.
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, window.innerHeight)));
      if (Math.abs(p - last) < 0.0006) return;
      last = p;

      plate.style.transform = `scale(${(BASE_SCALE + p * ZOOM).toFixed(4)})`;
      const copy = copyRef.current;
      if (copy) {
        // Copy rises and clears out ahead of the plate, so the two layers
        // separate as you scroll rather than travelling together.
        copy.style.transform = `translate3d(0, ${(p * -70).toFixed(1)}px, 0)`;
        copy.style.opacity = String(Math.max(0, 1 - p * 1.55).toFixed(3));

        // The pane clarifies as it leaves. Held at full frost through the
        // first 12% of travel so the copy is never mid-fade while it is still
        // the thing being read.
        const g = Math.max(0, Math.min(1, (p - 0.12) / 0.62));
        const lerp = (a: number, b: number) => a + (b - a) * g;
        // Drives both the panel variant and the per-line text panes.
        copy.style.setProperty("--g-fill", lerp(GLASS_REST.fill, GLASS_GONE.fill).toFixed(3));
        copy.style.setProperty("--g-blur", `${lerp(GLASS_REST.blur, GLASS_GONE.blur).toFixed(1)}px`);
        copy.style.setProperty("--g-edge", lerp(GLASS_REST.edge, GLASS_GONE.edge).toFixed(3));
        copy.style.setProperty("--g-spec", (1 - g).toFixed(3));
        copy.style.setProperty("--gt-fill", lerp(GLASS_REST.fill, GLASS_GONE.fill).toFixed(3));
        copy.style.setProperty("--gt-blur", `${lerp(GLASS_REST.blur, GLASS_GONE.blur).toFixed(1)}px`);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <header
      ref={hostRef}
      id="top"
      style={{
        position: "relative",
        minHeight: "min(100svh, 1100px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        // Full-bleed regardless of any max-width the page wrapper imposes.
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: "var(--bg-base)",
        isolation: "isolate",
      }}
    >
      <div
        ref={plateRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          transform: `scale(${BASE_SCALE})`,
          transformOrigin: "58% 46%",
          willChange: "transform",
          backgroundImage: `url(${LQIP})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={`${SRC}-1920.webp`}
          srcSet={`${SRC}-1440.webp 1440w, ${SRC}-1920.webp 1920w, ${SRC}-2752.webp 2752w`}
          sizes="100vw"
          alt="Isometric cutaway of the Everyday Digital Solutions studio — reception, open workspace, meeting rooms and client lounge, with the team at work"
          fetchPriority="high"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      <div
        ref={copyRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "var(--w-hero)",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 64px)",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </div>

      {overlay}
    </header>
  );
}

import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   EDS THREAD
   ───────────────────────────────────────────────────────────────────────────
   The signature motion from THEME.md: a single orange line drawn down the page
   as you scroll, with a pulse riding its leading tip.

   The path is not hard-coded. Any element marked `data-thread` (optionally
   `data-thread-x` with a 0–1 horizontal bias) becomes an anchor, and the curve
   is fitted through them at mount and on resize. That keeps the thread correct
   when copy reflows or a section is added — a fixed path drifts off its
   anchors the moment anything above it changes height.
   ═══════════════════════════════════════════════════════════════════════════ */

const W = 1200;

export function EdsThread() {
  const pathRef = useRef<SVGPathElement>(null);
  const [d, setD] = useState("");
  const [h, setH] = useState(0);
  const [len, setLen] = useState(0);
  const [prog, setProg] = useState(0);
  const [pulse, setPulse] = useState<{ x: number; y: number } | null>(null);

  // Build the path from the anchors currently in the document.
  useEffect(() => {
    const build = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-thread]"));
      if (nodes.length < 2) return;

      const docTop = window.scrollY;
      const pts = nodes.map((el, i) => {
        const r = el.getBoundingClientRect();
        const bias = parseFloat(el.dataset.threadX ?? "");
        // Alternate sides when no bias is given, so the line actually snakes
        // instead of running straight down the gutter.
        const x = Number.isFinite(bias) ? bias * W : i % 2 === 0 ? W * 0.30 : W * 0.70;
        return { x, y: r.top + docTop + r.height / 2 };
      });

      let path = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        // Vertical control handles: the curve leaves and enters each anchor
        // travelling downward, which reads as one continuous run of cable.
        const cp = (b.y - a.y) * 0.42;
        path += ` C${a.x.toFixed(1)} ${(a.y + cp).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - cp).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      }
      setD(path);
      setH(document.documentElement.scrollHeight);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(document.body);
    window.addEventListener("resize", build);
    // Late-loading images change section heights after first paint.
    const t = window.setTimeout(build, 600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (pathRef.current && d) setLen(pathRef.current.getTotalLength());
  }, [d]);

  useEffect(() => {
    if (!len) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setProg(1); return; }

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Lead the scroll slightly so the tip stays ahead of the reader rather
      // than trailing behind the section they are already looking at.
      const p = Math.min(1, Math.max(0, (window.scrollY + window.innerHeight * 0.55) / Math.max(1, max + window.innerHeight * 0.55)));
      setProg(p);
      const el = pathRef.current;
      if (el) {
        const pt = el.getPointAtLength(p * len);
        setPulse({ x: pt.x, y: pt.y });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [len]);

  if (!d) {
    // Still render the path once, invisibly, so getTotalLength has something
    // to measure on the next effect pass.
    return (
      <svg width={W} height={0} style={{ position: "absolute", opacity: 0 }} aria-hidden="true">
        <path ref={pathRef} d={d} fill="none" />
      </svg>
    );
  }

  const off = len * (1 - prog);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: W,
        height: h,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg width={W} height={h} style={{ display: "block", overflow: "visible" }}>
        {/* Bloom pass beneath the filament — the line has to read as emitting
            light onto the page, not drawn on top of it. */}
        <path
          d={d}
          fill="none"
          stroke="var(--glow-bloom, #FFC66B)"
          strokeWidth={11}
          strokeLinecap="round"
          opacity={0.32}
          style={{ filter: "blur(4px)" }}
          strokeDasharray={len}
          strokeDashoffset={off}
        />
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="var(--glow-core, #FF9B3D)"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={len}
          strokeDashoffset={off}
        />
        {pulse && prog > 0.001 && prog < 0.999 && (
          <>
            <circle cx={pulse.x} cy={pulse.y} r={14} fill="var(--glow-bloom, #FFC66B)" opacity={0.55} style={{ filter: "blur(7px)" }} />
            <circle cx={pulse.x} cy={pulse.y} r={6} fill="var(--glow-core, #FF9B3D)" />
          </>
        )}
      </svg>
    </div>
  );
}

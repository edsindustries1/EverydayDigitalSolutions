// Global hover delegate for the Glass Float effect.
// Lifts [data-float] / .glass / .glass-elevated elements on cursor enter,
// applies the SVG lens refraction, and tracks cursor position for the
// specular highlight. A lightweight "magnetic pull" leans nearby floatable
// elements a few pixels toward the cursor, so the whole UI feels alive
// before the user actually arrives at a target. Disabled on mobile and
// prefers-reduced-motion.
import { useEffect } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/canUseWebGL";
import { attachLiquidGlass, detachLiquidGlass } from "@/components/LiquidGlassFilter";

const LIFT_Y   = -12;
const SCALE_UP = 1.032;
const DUR_IN   = 0.42;
const DUR_OUT  = 0.50;
const EASE_IN  = "power3.out";
const EASE_OUT = "power2.out";

const MAGNETIC_RADIUS   = 80;   // px from the nearest edge
const MAGNETIC_MAX_PULL = 4;    // px capped offset toward cursor
const MAGNETIC_LERP     = 0.18; // per-frame approach factor
const MAGNETIC_SELECTOR =
  "[data-float], .glass, .glass-elevated, .btn-glass-primary, .btn-glass-neutral";

interface Tracked {
  el: HTMLElement;
  cx: number;
  cy: number;
  hw: number;
  hh: number;
  tx: number;
  ty: number;
  ox: number;
  oy: number;
}

function floatTarget(node: Element | null): HTMLElement | null {
  let el = node;
  while (el && el !== document.documentElement) {
    if (el instanceof HTMLElement) {
      const hasFloat = el.dataset.float !== undefined;
      const hasGlass = el.classList.contains("glass") || el.classList.contains("glass-elevated") || el.classList.contains("btn-glass-primary") || el.classList.contains("btn-glass-neutral");
      if (hasFloat || hasGlass) {
        const pos = getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky") return null;
        const r = el.getBoundingClientRect();
        if (r.width  > window.innerWidth  * 0.85) return null;
        if (r.height > window.innerHeight * 0.78) return null;
        return el;
      }
    }
    el = el.parentElement;
  }
  return null;
}

function updateCursorVars(el: HTMLElement, clientX: number, clientY: number): void {
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return;
  el.style.setProperty("--glass-x", ((clientX - r.left) / r.width  * 100).toFixed(1) + "%");
  el.style.setProperty("--glass-y", ((clientY - r.top)  / r.height * 100).toFixed(1) + "%");
}

function clearCursorVars(el: HTMLElement): void {
  el.style.removeProperty("--glass-x");
  el.style.removeProperty("--glass-y");
}

export function useGlassFloat(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (prefersReducedMotion()) return;

    let active: HTMLElement | null = null;
    const settlingUntil = new WeakMap<HTMLElement, number>();
    const tracked: Tracked[] = [];
    let cursorX = -1;
    let cursorY = -1;

    function refreshTracked() {
      const previous = new Set(tracked.map((t) => t.el));
      tracked.length = 0;
      document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR).forEach((el) => {
        const pos = getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky") return;
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) return;
        if (r.width  > window.innerWidth  * 0.85) return;
        if (r.height > window.innerHeight * 0.78) return;
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        tracked.push({
          el,
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          hw: r.width / 2,
          hh: r.height / 2,
          tx: 0, ty: 0, ox: 0, oy: 0,
        });
        previous.delete(el);
      });
      // Elements that scrolled out of range — settle them to origin.
      previous.forEach((el) => {
        if (el === active) return;
        gsap.set(el, { x: 0, y: 0 });
      });
    }

    function updateMagneticTargets() {
      if (cursorX < 0) return;
      const now = performance.now();
      for (const t of tracked) {
        if (t.el === active) { t.tx = 0; t.ty = 0; continue; }
        const until = settlingUntil.get(t.el);
        if (until && now < until) { t.tx = 0; t.ty = 0; continue; }
        const dx = cursorX - t.cx;
        const dy = cursorY - t.cy;
        const distX = Math.max(0, Math.abs(dx) - t.hw);
        const distY = Math.max(0, Math.abs(dy) - t.hh);
        const dist = Math.sqrt(distX * distX + distY * distY);
        if (dist < MAGNETIC_RADIUS) {
          const strength = 1 - dist / MAGNETIC_RADIUS;
          const norm = Math.sqrt(dx * dx + dy * dy) || 1;
          t.tx = (dx / norm) * MAGNETIC_MAX_PULL * strength;
          t.ty = (dy / norm) * MAGNETIC_MAX_PULL * strength;
        } else {
          t.tx = 0;
          t.ty = 0;
        }
      }
    }

    let rafId = 0;
    function tick() {
      const now = performance.now();
      for (const t of tracked) {
        if (t.el === active) continue;
        const until = settlingUntil.get(t.el);
        if (until && now < until) continue;
        const nx = t.ox + (t.tx - t.ox) * MAGNETIC_LERP;
        const ny = t.oy + (t.ty - t.oy) * MAGNETIC_LERP;
        if (Math.abs(nx - t.ox) > 0.01 || Math.abs(ny - t.oy) > 0.01) {
          t.ox = nx;
          t.oy = ny;
          gsap.set(t.el, { x: nx, y: ny });
        } else if (t.ox !== 0 || t.oy !== 0) {
          t.ox = 0;
          t.oy = 0;
          gsap.set(t.el, { x: 0, y: 0 });
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function enter(el: HTMLElement, clientX: number, clientY: number) {
      // Clear any lingering magnetic offset on the element being lifted.
      const t = tracked.find((x) => x.el === el);
      if (t) { t.tx = 0; t.ty = 0; t.ox = 0; t.oy = 0; }
      active = el;
      el.classList.add("glass-float-active");
      updateCursorVars(el, clientX, clientY);
      attachLiquidGlass(el);
      gsap.to(el, { x: 0, y: LIFT_Y, scale: SCALE_UP, duration: DUR_IN, ease: EASE_IN, overwrite: "auto" });
    }

    function leave(el: HTMLElement) {
      detachLiquidGlass(el);
      clearCursorVars(el);
      el.classList.remove("glass-float-active");
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: DUR_OUT, ease: EASE_OUT, overwrite: "auto" });
      // Block magnetic until the leave tween finishes, then it resumes naturally.
      settlingUntil.set(el, performance.now() + DUR_OUT * 1000 + 80);
      if (active === el) active = null;
    }

    function onMove(e: MouseEvent) {
      cursorX = e.clientX;
      cursorY = e.clientY;
      const target = floatTarget(e.target as Element);
      if (target !== active) {
        if (active) leave(active);
        if (target) enter(target, e.clientX, e.clientY);
      }
      if (active) {
        attachLiquidGlass(active); // re-snap after scroll
        updateCursorVars(active, e.clientX, e.clientY);
      }
      updateMagneticTargets();
    }

    function onLeaveDoc() {
      cursorX = -1;
      cursorY = -1;
      if (active) leave(active);
      // Settle every tracked element back to origin.
      for (const t of tracked) {
        t.tx = 0;
        t.ty = 0;
      }
    }

    let refreshScheduled = false;
    function scheduleRefresh() {
      if (refreshScheduled) return;
      refreshScheduled = true;
      requestAnimationFrame(() => {
        refreshScheduled = false;
        refreshTracked();
        updateMagneticTargets();
      });
    }

    // Initial measurement after the next paint so framer-motion entrance has
    // committed final positions.
    requestAnimationFrame(() => requestAnimationFrame(refreshTracked));

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeaveDoc);
    window.addEventListener("scroll", scheduleRefresh, { passive: true });
    window.addEventListener("resize", scheduleRefresh);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      window.removeEventListener("scroll", scheduleRefresh);
      window.removeEventListener("resize", scheduleRefresh);
      cancelAnimationFrame(rafId);
      for (const t of tracked) {
        gsap.set(t.el, { x: 0, y: 0 });
      }
      if (active) {
        const el = active;
        detachLiquidGlass(el);
        clearCursorVars(el);
        el.classList.remove("glass-float-active");
        gsap.killTweensOf(el);
        gsap.set(el, { x: 0, y: 0, scale: 1 });
        active = null;
      }
    };
  }, []);
}

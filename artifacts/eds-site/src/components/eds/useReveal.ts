import { useEffect } from "react";

/**
 * Section reveals from THEME.md: opacity 0→1 with translateY(30px)→0, staggered
 * per card. Implemented as one document-level observer rather than a hook per
 * element — a homepage of this length carries ~40 revealing nodes, and forty
 * observers is forty sets of layout callbacks for the same job.
 *
 * Elements opt in with `.eds-reveal`, and stagger with `--d` (a CSS delay).
 * Reveal is one-way: once seen, an element stays put. Re-hiding on scroll-up
 * makes a long page feel like it is flickering.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".eds-reveal:not(.is-in)"));
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
}

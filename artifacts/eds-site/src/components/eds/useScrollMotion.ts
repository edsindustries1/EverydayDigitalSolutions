import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL MOTION
   ───────────────────────────────────────────────────────────────────────────
   Three moves, applied to the page's existing markup rather than to new
   wrapper elements:

   · Headings rise a line at a time out of a clipping mask. This is the one
     that reads as expensive, and it is the only reason this file needs a line
     splitter at all.
   · Feature images wipe up from a clip and settle out of a slight overscale.
   · Card grids stagger in.

   It cooperates with the existing `.eds-reveal` system instead of replacing
   it: anything this file animates gets `is-in` set FIRST, which neutralises
   the CSS transition, and GSAP then owns that element outright. Two systems
   animating one element is the classic way to get a half-faded card that
   never resolves.

   Everything is inert under `prefers-reduced-motion` — content renders at its
   final state rather than never arriving.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Wrap each visual line of a plain-text element in a clipping mask.
 *
 *  Only plain-text elements. A heading containing inline markup (a coloured
 *  span, a link) would lose it — the caller checks, and skips those.
 *
 *  Returns the inner, movable element of each line. */
function splitLines(el: HTMLElement): HTMLElement[] {
  const text = (el.textContent ?? "").trim();
  if (!text) return [];

  // Pass 1: every word becomes a probe we can measure.
  el.textContent = "";
  const probes = text.split(/\s+/).map((word) => {
    const s = document.createElement("span");
    s.textContent = word;
    s.style.display = "inline-block";
    el.appendChild(s);
    el.appendChild(document.createTextNode(" "));
    return s;
  });

  // Pass 2: group by vertical position. Words on the same offsetTop are one
  // visual line, whatever the wrapping happened to be.
  const rows: string[][] = [];
  let lastTop: number | null = null;
  probes.forEach((p) => {
    const top = p.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 2) {
      rows.push([]);
      lastTop = top;
    }
    rows[rows.length - 1].push(p.textContent ?? "");
  });

  // Pass 3: rebuild as masks. The padding/margin pair keeps descenders (g, y,
  // p) from being sliced off by the mask's overflow.
  el.textContent = "";
  return rows.map((words) => {
    const mask = document.createElement("span");
    mask.className = "mo-line";
    const inner = document.createElement("span");
    inner.className = "mo-line-i";
    inner.textContent = words.join(" ");
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

/** True when the element is plain text — no element children to lose. */
function isPlainText(el: HTMLElement) {
  return el.children.length === 0 && (el.textContent ?? "").trim().length > 0;
}

export function useScrollMotion(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      // Line boxes are measured here. Splitting before the webfont has
      // swapped in gives line breaks for the fallback face, and every mask
      // ends up the wrong width.
      await document.fonts?.ready;
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const root = document.querySelector<HTMLElement>(".eds-home main");
        if (!root) return;

        /* ── Headings ── */
        root.querySelectorAll<HTMLElement>("h2").forEach((h) => {
          if (!isPlainText(h)) return;

          // Take ownership from the CSS reveal before touching anything.
          const block = h.closest<HTMLElement>(".eds-reveal");
          block?.classList.add("is-in");

          const lines = splitLines(h);
          if (!lines.length) return;

          const eyebrow = block?.querySelector<HTMLElement>(".eds-eyebrow");
          const lede = block?.querySelector<HTMLElement>(".eds-lede");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: block ?? h, start: "top 84%", once: true },
          });

          if (eyebrow) tl.from(eyebrow, { y: 12, opacity: 0, duration: 0.55, ease: "power2.out" });
          tl.from(
            lines,
            { yPercent: 112, duration: 0.95, stagger: 0.075, ease: "power3.out" },
            eyebrow ? "-=0.3" : 0,
          );
          if (lede) tl.from(lede, { y: 16, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.55");
        });

        /* ── Feature images: wipe up, settle out of overscale ── */
        root.querySelectorAll<HTMLElement>(".eds-well").forEach((well) => {
          const img = well.querySelector<HTMLElement>("img");
          if (!img) return;
          well.classList.add("is-in");
          well.closest(".eds-reveal")?.classList.add("is-in");

          gsap
            .timeline({ scrollTrigger: { trigger: well, start: "top 86%", once: true } })
            .from(well, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, ease: "power3.out" })
            .from(img, { scale: 1.14, duration: 1.3, ease: "power3.out" }, 0);

          // And a slow drift as it passes, so the image is never quite static.
          gsap.fromTo(
            img,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: well, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        /* ── Cards and steps ──
           ScrollTrigger.batch gives each element its OWN trigger and re-tests
           it on every refresh, which is what makes this survive late layout
           shifts (lazy images, the webfont swap, content-visibility sections
           painting for the first time). A single trigger for a whole grid is
           measured once; if that measurement is stale the group never enters
           and the cards stay invisible forever — which is a far worse failure
           than no animation at all. */
        const batchIn = (
          els: HTMLElement[],
          from: { x?: number; y?: number },
          stagger = 0.085,
        ) => {
          if (!els.length) return;
          els.forEach((e) => {
            e.classList.add("is-in");
            // The CSS system staggered with inline transitionDelay; GSAP owns
            // the stagger now, and a leftover delay would double it.
            e.style.transitionDelay = "";
          });
          gsap.set(els, { ...from, opacity: 0 });
          ScrollTrigger.batch(els, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger,
                ease: "power3.out",
                overwrite: true,
              }),
          });
        };

        /* ── The services rail deals itself in, one card at a time ──
           It is a HORIZONTAL scroller, so the cards arrive from the right —
           along the axis the rail actually travels — rather than rising like
           the stacked grids below. The stagger is nearly double the default
           so the sequence reads as one-then-the-next instead of as a group
           that happens to be slightly out of phase.

           `overflow-x: auto` on the rail means an x-offset would be scrollable
           content, so the rail is pinned with `overflow-x: clip` in CSS while
           these cards are still offset — see .eds-rail[data-dealing]. */
        const rail = root.querySelector<HTMLElement>(".eds-rail");
        const railCards = Array.from(root.querySelectorAll<HTMLElement>(".eds-rail .eds-card"));
        if (rail && railCards.length) {
          rail.dataset.dealing = "";
          batchIn(railCards, { x: 64 }, 0.14);
          // Release the clip once the last card has landed.
          gsap.delayedCall(0.85 + railCards.length * 0.14 + 0.2, () => delete rail.dataset.dealing);
        }

        // Only the cards themselves. `parent.children` would also sweep up the
        // section heading and the footnote paragraph that share the container.
        batchIn(
          Array.from(root.querySelectorAll<HTMLElement>(".eds-card")).filter((c) => !c.closest(".eds-rail")),
          { y: 34 },
        );
        batchIn(Array.from(root.querySelectorAll<HTMLElement>("#process ol > li")), { y: 30 });

        /* ── Whatever `.eds-reveal` is left ──
           Sweeping these up is a bug fix as much as a flourish. The CSS reveal
           observes with `threshold: 0.06`, and an element inside a
           `content-visibility: auto` section has zero area while that section
           is skipped — so a fraction of a zero-height box never satisfies the
           threshold and the node stays at opacity 0 permanently. The footnote
           under the Work section ("More client work coming as projects
           ship…") has been invisible to every visitor because of it. Batch
           triggers measure on refresh instead, after the section has real
           dimensions. */
        batchIn(Array.from(root.querySelectorAll<HTMLElement>(".eds-reveal:not(.is-in)")), { y: 24 });
      });

      // Splitting changed the height of every heading on the page, so every
      // trigger measured before this point is stale.
      ScrollTrigger.refresh();

      // And again once the lazy images below the fold have landed — they move
      // every trigger underneath them.
      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") ScrollTrigger.refresh();
      else window.addEventListener("load", onLoad, { once: true });

      teardown = () => {
        window.removeEventListener("load", onLoad);
        ctx.revert();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [enabled]);
}

/* ═══════════════════════════════════════════════════════════════════════════
   KINETIC LOADER  —  after Praashoo7 (Uiverse.io)
   ───────────────────────────────────────────────────────────────────────────
   Nine channels radiating at 20° steps, each with a ball falling and rising on
   a staggered delay. At 20px it reads as a spinner; at 60vmin it reads as a
   kinetic sculpture, which is the only reason it survives as a hero.

   Ported rather than pasted, in three respects:

   · The original positions every channel `absolute` inside a zero-size flex
     box, which only works because nothing around it is positioned. Dropped
     into a real page it would escape to the nearest positioned ancestor. Here
     the channels are stacked with `grid-area: 1/1`, so they centre on each
     other honestly and the rotation transforms are untouched.
   · Sizing is driven entirely by one `font-size` on `.kinetic`. Every internal
     dimension is already in `em`, so scaling from a spinner to a hero is one
     property — see `--kinetic-size` in kinetic.css.
   · Nine channels, not ten. The source ships `.ball0`–`.ball9` but only
     rotates `:nth-child(2)`–`(9)`; 0°–160° in 20° steps is nine positions, and
     the tenth ball had nowhere to go.

   No JavaScript, which means nothing to make SSR-safe and nothing running on
   the main thread while you scroll.
   ═══════════════════════════════════════════════════════════════════════════ */

const CHANNELS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function KineticLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`kinetic ${className}`.trim()} aria-hidden="true">
      <div className="main">
        {/* The channels: recessed grooves the balls travel along. */}
        <div className="loaders">
          {CHANNELS.map((i) => (
            <div key={i} className="loader" />
          ))}
        </div>
        {/* The balls, on transparent tracks stacked over the channels. */}
        <div className="loadersB">
          {CHANNELS.map((i) => (
            <div key={i} className="loaderA">
              <div className={`ball ball${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

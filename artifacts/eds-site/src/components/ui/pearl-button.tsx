import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PEARL BUTTON
   ───────────────────────────────────────────────────────────────────────────
   A dark capsule lit from inside — the shine comes from a stack of inset
   shadows plus two pseudo-elements (a wide elliptical bloom and a top gloss),
   not from a background image.

   Two deliberate departures from the snippet this came from:

   · The CSS lives in src/styles/pearl.css, not in a <style> tag inside the
     component. React renders that tag once per instance, so a page with a
     dozen buttons would ship a dozen identical copies of the same rules.
   · Everything is driven by custom properties (--pearl-font, --pearl-pad-*,
     --pearl-radius), so `size` can retune the capsule without duplicating the
     shadow stack. The snippet's own proportions are the `lg` size.

   The bare `.pearl-button` class works on an <a> too — most calls to action on
   this site are links, not buttons. Use the class directly for those.
   ═══════════════════════════════════════════════════════════════════════════ */

export type PearlButtonSize = "sm" | "md" | "lg";

type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  size?: PearlButtonSize;
  /** The ✧ → ✦ glyph that swaps on hover. Pass false for a plain label. */
  sparkle?: boolean;
};

export const PearlButton: React.FC<PearlButtonProps> = ({
  label = "Pearl Button",
  size = "lg",
  sparkle = true,
  className = "",
  ...props
}) => {
  return (
    <button className={`pearl-button pearl-button--${size} ${className}`.trim()} {...props}>
      <div className="wrap">
        <p>
          {sparkle ? (
            <>
              <span>✧</span>
              <span>✦</span>
            </>
          ) : null}
          {label}
        </p>
      </div>
    </button>
  );
};

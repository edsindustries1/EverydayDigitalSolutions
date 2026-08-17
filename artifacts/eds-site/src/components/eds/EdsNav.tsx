import { useEffect, useState } from "react";
import { Link } from "wouter";

/* ═══════════════════════════════════════════════════════════════════════════
   EDS NAV — floating rounded bar
   ───────────────────────────────────────────────────────────────────────────
   Not a full-bleed strip: the bar is inset from all three edges, carries a
   large corner radius and its own shadow, so it reads as a card floating over
   the page rather than a browser chrome band welded to the top.

   It stays opaque white rather than translucent. The hero render runs right up
   underneath it, and a frosted bar over that much detail turns the nav links
   into noise.
   ═══════════════════════════════════════════════════════════════════════════ */

const LOGO = "/renders/eds/ref-logo.webp";

export interface NavItem { label: string; href: string; external?: boolean }

export function EdsNav({ items, active }: { items: NavItem[]; active: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = 0, raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setHidden(y > 160 && y > last);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 60,
        padding: "clamp(10px, 1.2vw, 18px) clamp(10px, 1.2vw, 18px) 0",
        transform: hidden ? "translateY(-130%)" : "none",
        transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
        pointerEvents: "none",
      }}
    >
      {/* Styling lives in CSS, not inline: an inline `background` cannot be
          reached by a theme, and this bar has to turn to glass over the hero
          photograph. */}
      <nav className="eds-nav-bar">
        <Link href="/" style={{ display: "block", flex: "none" }} aria-label="Everyday Digital Solutions — home">
          <img src={LOGO} alt="Everyday Digital Solutions" className="eds-nav-logo" />
        </Link>

        <div className="hidden lg:flex" style={{ gap: "clamp(20px, 2.2vw, 40px)", alignItems: "center" }}>
          {items.map((it) => {
            const isActive = active === it.label;
            const inner = (
              <>
                {it.label}
                <span
                  style={{
                    position: "absolute", left: 0, right: 0, bottom: -8,
                    height: 2, borderRadius: 2, background: "var(--accent)",
                    opacity: isActive ? 1 : 0, transition: "opacity .3s",
                  }}
                />
              </>
            );
            const style: React.CSSProperties = {
              position: "relative",
              fontSize: 16,
              fontWeight: 500,
              color: isActive ? "var(--accent)" : "var(--text-primary)",
              transition: "color .3s",
            };
            return it.external ? (
              <Link key={it.label} href={it.href} style={style}>{inner}</Link>
            ) : (
              <a key={it.label} href={it.href} style={style}>{inner}</a>
            );
          })}
        </div>

        {/* Class, not inline styles: an inline `padding` cannot be relaxed by a
            media query, and at 320px this button plus the logo overflowed the
            viewport by 12px. */}
        <a href="#contact" className="eds-btn eds-nav-cta">
          Let’s Talk
          <span className="eds-arrow">→</span>
        </a>
      </nav>
    </div>
  );
}

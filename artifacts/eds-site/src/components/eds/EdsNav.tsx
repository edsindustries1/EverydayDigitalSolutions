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
      <nav
        style={{
          pointerEvents: "auto",
          background: "#fff",
          borderRadius: 26,
          border: "1px solid var(--hairline)",
          boxShadow: "0 2px 6px rgba(60,45,30,.05), 0 14px 40px -14px rgba(60,45,30,.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "12px 12px 12px clamp(16px, 1.6vw, 26px)",
        }}
      >
        <Link href="/" style={{ display: "block", flex: "none" }} aria-label="Everyday Digital Solutions — home">
          <img src={LOGO} alt="Everyday Digital Solutions" style={{ display: "block", height: 42 }} />
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

        <a
          href="#contact"
          className="eds-btn"
          style={{ fontSize: 16, padding: "13px 13px 13px 24px", borderRadius: 999, flex: "none" }}
        >
          Let’s Talk
          <span className="eds-arrow" style={{ width: 30, height: 30, fontSize: 15 }}>→</span>
        </a>
      </nav>
    </div>
  );
}

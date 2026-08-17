import { KineticLoader } from "@/components/ui/kinetic-loader";

/* The homepage hero: the kinetic sculpture on paper, copy in ink.
   Pure CSS — nothing here runs on the main thread while you scroll. */
export function KineticHero() {
  return (
    <header id="top" className="kinetic-hero">
      <KineticLoader className="kinetic-hero__art" />

      <div className="kinetic-hero__inner">
        <div className="kinetic-hero__copy">
          <div className="eds-reveal is-in" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 18px", border: "1px solid var(--border-default)", borderRadius: 999, background: "var(--bg-elevated)", fontSize: 14, fontWeight: 500 }}>
            <span className="eds-live-dot" />
            <span>Senior-led product studio · Mohali</span>
          </div>

          <h1 style={{ margin: "22px 0 0", fontSize: "clamp(2.1rem, 4.2vw, 3.6rem)", lineHeight: 1.05, letterSpacing: "-0.035em" }} data-thread data-thread-x="0.26">
            Product studio.{" "}
            <span style={{ color: "var(--accent)" }}>Not an agency.</span>
          </h1>

          <p className="eds-lede" style={{ margin: "18px 0 0", maxWidth: "30rem", fontSize: 17 }}>
            Native apps, AI voice agents and the systems behind them — designed, engineered and shipped
            by the same senior people who pitched you.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <a href="#contact" className="eds-btn">Start Your Project<span className="eds-arrow">→</span></a>
            <a href="#work" className="eds-btn-2">View Our Work</a>
          </div>
        </div>
      </div>
    </header>
  );
}

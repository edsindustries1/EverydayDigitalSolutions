import { useEffect } from "react";
import { PearlButton } from "@/components/ui/pearl-button";

/* The button reference. Every size, on both grounds, plus the anchor form —
   most calls to action on this site are links, and a <button> would break
   middle-click and "open in new tab". */

function Row({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <section
      style={{
        padding: "56px 40px",
        background: dark ? "#0f100e" : "#ffffff",
        color: dark ? "#fff" : "#0a0a0a",
      }}
    >
      <p
        style={{
          margin: "0 0 28px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.5,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center" }}>
        <PearlButton size="lg" label="Start Your Project" />
        <PearlButton size="md" label="Start Your Project" />
        <PearlButton size="sm" label="Start Your Project" />
        <PearlButton size="md" label="No sparkle" sparkle={false} />
        {/* The class on its own — this is the form the site's CTAs would use. */}
        <a href="#contact" className="pearl-button pearl-button--md">
          <div className="wrap">
            <p>
              <span>✧</span>
              <span>✦</span>
              As a link
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

export default function ButtonsPreview() {
  useEffect(() => {
    document.title = "Pearl button — reference";
  }, []);

  return (
    <main style={{ minHeight: "100svh", background: "#fff" }}>
      <Row label="On white" />
      <Row label="On the dark ground" dark />
    </main>
  );
}

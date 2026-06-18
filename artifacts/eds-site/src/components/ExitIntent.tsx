import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LeadMagnet } from "./LeadMagnet";

// NOTE: This used to be an exit-intent modal (triggered on mouse-leave at the top
// of the viewport). That fired almost immediately — including for Google's ad
// review bot — which read as a disruptive interstitial and risked an Ads policy
// violation. It now appears only after the visitor has stayed ~1 minute, once per
// session, desktop only. Set REMOVE-friendly: delete <ExitIntent /> from App.tsx
// to disable entirely.

const SHOWN_KEY = "eds_exit_intent_shown";
const DELAY_MS = 60_000; // show only after ~1 minute of dwell time
const EXCLUDED_PATHS = ["/contact", "/admin", "/card"];

export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Already shown in this session — never show again on reload/navigation.
    try {
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
    } catch {
      return;
    }

    // ExitIntent is mounted once at the app root, so this timer measures total
    // time on the site (it does not reset on client-side navigation).
    const timer = window.setTimeout(() => {
      if (window.innerWidth < 1024) return; // desktop only
      const path = window.location.pathname;
      if (EXCLUDED_PATHS.some((p) => path.startsWith(p))) return;
      try {
        if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        return;
      }
      setOpen(true);
    }, DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative glass-elevated rounded-2xl max-w-md w-full p-6 sm:p-8">
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-2">
          While you're here
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
          Get the <em className="italic text-primary">App Cost Guide</em>.
        </h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Built from 7 years of working with service businesses in Punjab, plus our 2026 flagship build for Quasar Salon. 18 pages. Free.
        </p>
        <LeadMagnet source="timed_modal" variant="compact" />
      </div>
    </div>
  );
}

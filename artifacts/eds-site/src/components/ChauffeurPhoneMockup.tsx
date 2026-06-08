/**
 * Hand-coded iPhone-frame mockup of the Everywhere Transfers chauffeur
 * booking screen. The app is still in build, so there are no real
 * screenshots yet — this is an illustrative UI mockup, same approach as
 * the Open Humana / OneClickAssist dashboard mockups elsewhere on the site.
 */
export function ChauffeurPhoneMockup() {
  const vehicles = [
    { label: "Business", note: "Sedan", selected: false },
    { label: "Première", note: "Luxury", selected: true },
    { label: "SUV", note: "6 seats", selected: false },
  ];

  return (
    <div
      data-float=""
      className="relative mx-auto w-full max-w-[280px] aspect-[9/19.5] rounded-[2.5rem] border-[10px] border-[#1a1714] bg-background shadow-2xl overflow-hidden flex-shrink-0 transition-transform"
    >
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 w-32 bg-[#1a1714] mx-auto rounded-b-[1rem] z-20" />

      {/* Screen */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#0c0b0a] flex flex-col">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[9px] text-foreground/60 font-medium">
          <span>9:41</span>
          <span className="tracking-tight">5G&nbsp;&nbsp;100%</span>
        </div>

        {/* Map / route region */}
        <div className="relative mx-3 mt-1 h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1814] to-[#0f0d0b] border border-white/5">
          {/* faint grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* route line + pins */}
          <svg viewBox="0 0 240 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <path
              d="M40 74 C90 74 120 30 196 26"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="2 7"
              opacity="0.9"
            />
            <circle cx="40" cy="74" r="5" fill="var(--accent)" />
            <circle cx="40" cy="74" r="9" fill="var(--accent)" opacity="0.2" />
            <rect x="191" y="20" width="11" height="11" rx="2.5" fill="var(--accent)" />
          </svg>
          {/* brand chip */}
          <span className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-widest text-primary bg-[var(--accent-soft)] px-2 py-0.5 rounded-full">
            Everywhere Transfers
          </span>
        </div>

        {/* Booking sheet */}
        <div className="flex-1 px-3 pt-3 flex flex-col gap-2.5">
          <p className="text-[11px] font-serif text-foreground px-1">Where to?</p>

          {/* Pickup / drop-off */}
          <div className="bg-[#161310] border border-white/8 rounded-xl divide-y divide-white/6">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[7px] uppercase tracking-widest text-muted-foreground">Pickup</p>
                <p className="text-[10px] text-foreground truncate">Home · 12 Park Lane</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[7px] uppercase tracking-widest text-muted-foreground">Drop-off</p>
                <p className="text-[10px] text-foreground truncate">Airport · Terminal 5</p>
              </div>
            </div>
          </div>

          {/* Time row */}
          <div className="flex items-center justify-between bg-[#161310] border border-white/8 rounded-xl px-3 py-2">
            <span className="text-[7px] uppercase tracking-widest text-muted-foreground">Pickup time</span>
            <span className="text-[10px] text-foreground">Today · 6:30 PM</span>
          </div>

          {/* Vehicle classes */}
          <div className="grid grid-cols-3 gap-1.5">
            {vehicles.map((v) => (
              <div
                key={v.label}
                className={`rounded-xl px-1.5 py-2 text-center border ${
                  v.selected
                    ? "border-primary bg-[var(--accent-soft)]"
                    : "border-white/8 bg-[#161310]"
                }`}
              >
                <p className={`text-[9px] font-bold ${v.selected ? "text-primary" : "text-foreground"}`}>{v.label}</p>
                <p className="text-[7px] text-muted-foreground">{v.note}</p>
              </div>
            ))}
          </div>

          {/* Quote + CTA */}
          <div className="mt-auto mb-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground">Upfront quote</span>
              <span className="text-[13px] font-serif text-primary">$82</span>
            </div>
            <div className="w-full bg-primary text-center rounded-full py-2.5 text-[10px] font-bold text-primary-foreground">
              Book Chauffeur
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

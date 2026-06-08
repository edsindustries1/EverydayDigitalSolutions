/**
 * Hand-coded iPhone-frame mockup of the Brampton Dentists patient booking
 * screen. The app is still in build, so there are no real screenshots yet —
 * this is an illustrative UI mockup, the same approach as the Everywhere
 * Transfers / Open Humana / OneClickAssist mockups elsewhere on the site.
 */
export function DentalPhoneMockup() {
  const services = [
    { label: "Checkup", note: "30 min", selected: true },
    { label: "Cleaning", note: "45 min", selected: false },
    { label: "Whitening", note: "60 min", selected: false },
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

        {/* Header / hero region */}
        <div className="relative mx-3 mt-1 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#16201c] to-[#0f0d0b] border border-white/5 flex items-center px-4 gap-3">
          {/* Tooth motif */}
          <svg viewBox="0 0 48 48" className="w-9 h-9 flex-shrink-0" aria-hidden="true">
            <path
              d="M24 10c-5-4-12-4-15 1-3 5-1 12 1 18 1.5 4.5 2 9 4 9s2.5-6 6-6 4 6 6 6 2.5-4.5 4-9c2-6 4-13 1-18-3-5-10-5-15-1Z"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.2em] text-primary">Brampton Dentists</p>
            <p className="text-[13px] font-serif text-foreground leading-tight mt-0.5">Book your visit</p>
          </div>
          <span className="absolute top-2 right-2 text-[7px] font-bold uppercase tracking-widest text-primary bg-[var(--accent-soft)] px-2 py-0.5 rounded-full">
            Canada
          </span>
        </div>

        {/* Booking sheet */}
        <div className="flex-1 px-3 pt-3 flex flex-col gap-2.5">
          {/* Service selection */}
          <p className="text-[7px] uppercase tracking-widest text-muted-foreground px-1">Service</p>
          <div className="grid grid-cols-3 gap-1.5">
            {services.map((s) => (
              <div
                key={s.label}
                className={`rounded-xl px-1.5 py-2 text-center border ${
                  s.selected
                    ? "border-primary bg-[var(--accent-soft)]"
                    : "border-white/8 bg-[#161310]"
                }`}
              >
                <p className={`text-[9px] font-bold ${s.selected ? "text-primary" : "text-foreground"}`}>{s.label}</p>
                <p className="text-[7px] text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>

          {/* Dentist */}
          <div className="flex items-center gap-2 bg-[#161310] border border-white/8 rounded-xl px-3 py-2.5">
            <span className="w-6 h-6 rounded-full bg-muted/20 flex items-center justify-center text-[9px] font-bold text-muted-foreground flex-shrink-0">
              P
            </span>
            <div className="min-w-0">
              <p className="text-[7px] uppercase tracking-widest text-muted-foreground">Dentist</p>
              <p className="text-[10px] text-foreground truncate">Dr. Patel · General Dentist</p>
            </div>
          </div>

          {/* Date / time */}
          <div className="flex items-center justify-between bg-[#161310] border border-white/8 rounded-xl px-3 py-2">
            <span className="text-[7px] uppercase tracking-widest text-muted-foreground">Appointment</span>
            <span className="text-[10px] text-foreground">Wed, Jun 17 · 10:30 AM</span>
          </div>

          {/* Reminder note */}
          <div className="flex items-center gap-2 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="text-[8px] text-muted-foreground">Reminder sent 24h before · reschedule anytime</span>
          </div>

          {/* CTA */}
          <div className="mt-auto mb-3">
            <div className="w-full bg-primary text-center rounded-full py-2.5 text-[10px] font-bold text-primary-foreground">
              Book Appointment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

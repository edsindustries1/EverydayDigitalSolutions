import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneMockupProps {
  screens?: string[];
  video?: string;
  poster?: string;
}

export function PhoneMockup({ screens, video, poster }: PhoneMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (video) return;
    if (!screens || screens.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [screens, video]);

  if (!video && (!screens || screens.length === 0)) return null;

  if (video) {
    // The MP4 has the iPhone baked into the frame. We clip the rectangle's
    // corners to match the device's rounded shape so no dark backdrop shows
    // through, and drop a soft shadow underneath. No extra bezel.
    return (
      <div
        data-float=""
        className="quasar-demo relative mx-auto w-full max-w-[380px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[380px] transition-transform"
        style={{
          aspectRatio: "760 / 1560",
          filter: "drop-shadow(0 40px 60px rgba(0, 0, 0, 0.35))",
        }}
      >
        <video
          className="quasar-demo__video block w-full h-full bg-transparent"
          style={{ borderRadius: "15.3% / 7.5%" }}
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Silent demo of booking a service in the Quasar Salon iPhone app"
        />
      </div>
    );
  }

  return (
    <div
      data-float=""
      className="relative mx-auto w-full max-w-[280px] aspect-[9/19.5] rounded-[2.5rem] border-[10px] border-[#1a1714] bg-background shadow-2xl overflow-hidden flex-shrink-0 transition-transform"
    >
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 w-32 bg-[#1a1714] mx-auto rounded-b-[1rem] z-20" />

      {/* Screen */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={screens![currentIndex]}
            alt={`Quasar Salon app — screen ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

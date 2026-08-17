import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/constants";

const HIDE_AFTER_PX = 700;

export function WhatsAppFAB() {
  const [location] = useLocation();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function onScroll() {
      setHidden(window.scrollY > HIDE_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setHidden(window.scrollY > HIDE_AFTER_PX);
  }, [location]);

  if (location.startsWith("/contact") || location.startsWith("/admin") || location.startsWith("/card")) return null;
  if (hidden) return null;

  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-float=""
      className="eds-wa-fab fixed bottom-5 right-5 z-30 flex md:hidden items-center justify-center rounded-full transition-colors focus-visible:outline-none"
      style={{ width: "52px", height: "52px" }}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

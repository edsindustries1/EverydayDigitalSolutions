import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Mail, QrCode, UserPlus, X } from "lucide-react";
import { downloadVCard, type VCardData } from "@/lib/vcard";
import { makeQrSvg } from "@/lib/qr";

interface CardActionsProps {
  vcard: VCardData;
  vcardFilename: string;
  qrPayload: string;
  qrLabel: string;
  telHref: string;
  whatsappHref: string;
  mailtoHref: string;
}

export function CardActions({
  vcard,
  vcardFilename,
  qrPayload,
  qrLabel,
  telHref,
  whatsappHref,
  mailtoHref,
}: CardActionsProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const [qrSvg, setQrSvg] = useState<string | null>(null);

  useEffect(() => {
    if (!qrOpen || qrSvg) return;
    const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    makeQrSvg(qrPayload, { darkMode: dark })
      .then(setQrSvg)
      .catch(() => setQrSvg(null));
  }, [qrOpen, qrSvg, qrPayload]);

  useEffect(() => {
    if (!qrOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setQrOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [qrOpen]);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      <button
        type="button"
        onClick={() => downloadVCard(vcard, vcardFilename)}
        data-float=""
        className="btn-glass-primary inline-flex items-center justify-center gap-2 w-full h-12 px-6 text-[0.95rem] font-semibold"
      >
        <UserPlus className="w-[1.05rem] h-[1.05rem]" />
        Save to Contacts
      </button>

      <div className="grid grid-cols-4 gap-2.5">
        <ActionIcon href={telHref} label="Call">
          <Phone className="w-5 h-5" />
        </ActionIcon>
        <ActionIcon href={whatsappHref} label="WhatsApp" external>
          <MessageCircle className="w-5 h-5" />
        </ActionIcon>
        <ActionIcon href={mailtoHref} label="Email">
          <Mail className="w-5 h-5" />
        </ActionIcon>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          aria-label="Show QR code"
          data-float=""
          className="btn-glass-neutral inline-flex items-center justify-center h-12 text-foreground/80"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {qrOpen && <QrModal qrSvg={qrSvg} qrLabel={qrLabel} onClose={() => setQrOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function QrModal({
  qrSvg,
  qrLabel,
  onClose,
}: {
  qrSvg: string | null;
  qrLabel: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        role="button"
        tabIndex={-1}
        aria-label="Close QR code"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer"
        style={{
          background: "var(--glass-fill)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="QR code"
        className="relative glass-elevated rounded-3xl w-full max-w-[22rem] p-6 sm:p-7 flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-[var(--accent-soft)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[0.62rem] uppercase tracking-[0.3em] font-semibold text-[var(--accent)]">
          Scan to open
        </span>

        <div className="w-60 h-60 sm:w-64 sm:h-64 flex items-center justify-center rounded-2xl bg-background/40 p-3 border border-[var(--glass-stroke)]">
          {qrSvg ? (
            <div
              aria-label="QR code"
              className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <div className="text-xs text-muted-foreground">Generating…</div>
          )}
        </div>

        <p className="font-mono text-[0.75rem] text-foreground/80 text-center tracking-tight break-all">
          {qrLabel}
        </p>
      </motion.div>
    </motion.div>
  );
}

function ActionIcon({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      data-float=""
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="btn-glass-neutral inline-flex items-center justify-center h-12 text-foreground/80 hover:text-foreground"
    >
      {children}
    </a>
  );
}

import { site } from "@/lib/constants";

/**
 * Shared legal-entity identity line for policy pages. Razorpay's compliance
 * crawler expects the legal entity name + GSTIN to appear identically on
 * every policy page — keep this the single source of that line.
 */
export function LegalIdentityLine() {
  return (
    <p className="not-prose text-sm text-muted-foreground leading-relaxed mt-4">
      Services provided by <strong className="text-foreground">{site.legalName}</strong>{" "}
      · GSTIN: {site.gstin} · {site.registeredAddress}
    </p>
  );
}

/**
 * Shared contact block for the bottom of policy pages.
 */
export function LegalContactBlock() {
  return (
    <>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us at:
      </p>
      <ul>
        <li>
          <strong>{site.legalName}</strong> (GSTIN: {site.gstin})
        </li>
        <li>
          Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          Phone / WhatsApp: <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
        </li>
        <li>Registered address: {site.registeredAddress}</li>
      </ul>
    </>
  );
}

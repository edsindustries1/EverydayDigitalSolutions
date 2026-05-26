import { Resend } from "resend";
import { logger } from "./logger";

// Lazy singleton — instantiated only when an API key is present so the
// module can be imported safely in environments without one.
let cachedClient: Resend | null = null;
function getClient(): Resend | null {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return null;
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}

interface SendOptions {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

/**
 * Send a transactional email via Resend.
 * Returns true on success. NEVER throws — caller must continue on failure.
 *
 * Requires env:
 *   RESEND_API_KEY            — issued at resend.com/api-keys
 *   LEAD_NOTIFICATION_EMAIL   — destination (e.g. edsindustries1@gmail.com)
 *   LEAD_NOTIFICATION_FROM    — sender (default: onboarding@resend.dev — works
 *                               without verifying a domain; for branded sender
 *                               like leads@everydaydigitalsolutions.com you
 *                               must verify the domain in Resend dashboard)
 */
export async function sendNotificationEmail(opts: SendOptions): Promise<boolean> {
  const client = getClient();
  const to = process.env["LEAD_NOTIFICATION_EMAIL"];
  const from = process.env["LEAD_NOTIFICATION_FROM"] ?? "Everyday Digital Solutions <onboarding@resend.dev>";

  if (!client || !to) {
    logger.warn(
      { hasResend: Boolean(client), hasTo: Boolean(to) },
      "Email env not configured; skipping email notification",
    );
    return false;
  }

  try {
    const { error } = await client.emails.send({
      from,
      to: [to],
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });

    if (error) {
      logger.warn({ error }, "Resend returned error");
      return false;
    }
    logger.info("Notification email dispatched");
    return true;
  } catch (err) {
    logger.error({ err }, "Resend request threw");
    return false;
  }
}

const escape = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Format a lead-form submission into a plain + HTML notification. */
export function formatLeadEmail(lead: {
  name: string;
  businessName: string | null;
  whatsappNumber: string;
  email: string | null;
  city: string;
  industry: string;
  problem: string;
  goalIn3Months: string;
  budget: string;
  timeline: string;
}): { subject: string; text: string; html: string; replyTo?: string } {
  const subject = `New lead — ${lead.name}${lead.businessName ? ` (${lead.businessName})` : ""} · ${lead.city}`;

  const text = [
    "NEW LEAD — everydaydigitalsolutions.com",
    "",
    `Name: ${lead.name}${lead.businessName ? ` (${lead.businessName})` : ""}`,
    `WhatsApp: ${lead.whatsappNumber}`,
    lead.email ? `Email: ${lead.email}` : null,
    `City: ${lead.city}`,
    `Industry: ${lead.industry}`,
    `Budget: ${lead.budget}  |  Timeline: ${lead.timeline}`,
    "",
    `Problem:`,
    lead.problem,
    "",
    `Goal (3 months):`,
    lead.goalIn3Months,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222;line-height:1.55">
      <div style="border-bottom:2px solid #c9a55b;padding-bottom:12px;margin-bottom:20px">
        <h1 style="margin:0;font-size:18px;font-weight:600;letter-spacing:0.02em">NEW LEAD — everydaydigitalsolutions.com</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;width:130px;color:#666">Name</td><td style="padding:6px 0;font-weight:500">${escape(lead.name)}${lead.businessName ? ` <span style="color:#666">(${escape(lead.businessName)})</span>` : ""}</td></tr>
        <tr><td style="padding:6px 0;color:#666">WhatsApp</td><td style="padding:6px 0"><a href="https://wa.me/${escape(lead.whatsappNumber.replace(/[^0-9]/g, ""))}" style="color:#c9a55b;text-decoration:none">${escape(lead.whatsappNumber)}</a></td></tr>
        ${lead.email ? `<tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escape(lead.email)}" style="color:#c9a55b;text-decoration:none">${escape(lead.email)}</a></td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#666">City</td><td style="padding:6px 0">${escape(lead.city)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Industry</td><td style="padding:6px 0">${escape(lead.industry)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Budget</td><td style="padding:6px 0">${escape(lead.budget)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Timeline</td><td style="padding:6px 0">${escape(lead.timeline)}</td></tr>
      </table>
      <div style="margin-top:20px">
        <p style="margin:0 0 6px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Problem</p>
        <p style="margin:0;white-space:pre-wrap">${escape(lead.problem)}</p>
      </div>
      <div style="margin-top:16px">
        <p style="margin:0 0 6px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Goal in 3 months</p>
        <p style="margin:0;white-space:pre-wrap">${escape(lead.goalIn3Months)}</p>
      </div>
    </div>
  `;

  return { subject, text, html, ...(lead.email ? { replyTo: lead.email } : {}) };
}

/** Format a quote-generator submission into a plain + HTML notification. */
export function formatQuoteEmail(input: {
  contactName: string;
  businessName: string | null;
  contactEmail: string | null;
  industry: string;
  projectType: string;
  projectTypeLabel: string;
  features: string[];
  scale: string;
  timeline: string;
  projectDescription: string;
  total: number;
  minDays: number;
  maxDays: number;
  quoteRef: string;
}): { subject: string; text: string; html: string; replyTo?: string } {
  const inr = `₹${input.total.toLocaleString("en-IN")}`;
  const subject = `New quote — ${input.contactName}${input.businessName ? ` (${input.businessName})` : ""} · ${inr} · ${input.projectTypeLabel}`;

  const text = [
    "NEW QUOTE GENERATED — everydaydigitalsolutions.com/get-a-quote",
    "",
    `Quote ref: ${input.quoteRef}`,
    `Contact: ${input.contactName}${input.businessName ? ` (${input.businessName})` : ""}`,
    input.contactEmail ? `Email: ${input.contactEmail}` : null,
    `Industry: ${input.industry}`,
    `Project type: ${input.projectTypeLabel}`,
    `Features: ${input.features.length > 0 ? input.features.join(", ") : "core platform only"}`,
    `Scale: ${input.scale}`,
    `Timeline: ${input.timeline}`,
    "",
    `Total: ${inr}`,
    `Delivery: ${input.minDays}–${input.maxDays} working days`,
    "",
    `Description:`,
    input.projectDescription,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#222;line-height:1.55">
      <div style="border-bottom:2px solid #c9a55b;padding-bottom:12px;margin-bottom:20px">
        <h1 style="margin:0;font-size:18px;font-weight:600;letter-spacing:0.02em">NEW QUOTE — everydaydigitalsolutions.com</h1>
        <p style="margin:6px 0 0;font-size:12px;color:#666">Ref: ${escape(input.quoteRef)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;width:130px;color:#666">Contact</td><td style="padding:6px 0;font-weight:500">${escape(input.contactName)}${input.businessName ? ` <span style="color:#666">(${escape(input.businessName)})</span>` : ""}</td></tr>
        ${input.contactEmail ? `<tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escape(input.contactEmail)}" style="color:#c9a55b;text-decoration:none">${escape(input.contactEmail)}</a></td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#666">Industry</td><td style="padding:6px 0">${escape(input.industry)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Project type</td><td style="padding:6px 0">${escape(input.projectTypeLabel)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Scale</td><td style="padding:6px 0">${escape(input.scale)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Timeline</td><td style="padding:6px 0">${escape(input.timeline)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Total</td><td style="padding:6px 0;font-size:18px;font-weight:600;color:#c9a55b">${inr}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Delivery</td><td style="padding:6px 0">${input.minDays}–${input.maxDays} working days</td></tr>
      </table>
      ${input.features.length > 0 ? `
      <div style="margin-top:20px">
        <p style="margin:0 0 6px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Features</p>
        <p style="margin:0">${escape(input.features.join(", "))}</p>
      </div>` : ""}
      <div style="margin-top:16px">
        <p style="margin:0 0 6px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">Description</p>
        <p style="margin:0;white-space:pre-wrap">${escape(input.projectDescription)}</p>
      </div>
    </div>
  `;

  return { subject, text, html, ...(input.contactEmail ? { replyTo: input.contactEmail } : {}) };
}

import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { sendWhatsApp, formatLeadMessage } from "../lib/whatsapp";
import { scheduleRetry } from "../lib/whatsapp-retry";
import { sendNotificationEmail, formatLeadEmail } from "../lib/email";
import { withTimeout } from "../lib/with-timeout";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const DB_TIMEOUT_MS = 3000;

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid lead body");
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const input = parsed.data;

  const rawSessionId = (req.body as { sessionId?: unknown })?.sessionId;
  const sessionId =
    typeof rawSessionId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      rawSessionId,
    )
      ? rawSessionId
      : null;

  // Try to persist the lead, but never block notifications on a slow or
  // unreachable DB. If the insert fails for any reason, we still respond OK
  // and still fire WhatsApp + email — those use the validated input directly.
  let savedRow: { id: string } | null = null;
  try {
    const insertPromise = db
      .insert(leadsTable)
      .values({
        sessionId,
        name: input.name,
        businessName: input.businessName ?? null,
        whatsappNumber: input.whatsappNumber,
        email: input.email ?? null,
        city: input.city,
        industry: input.industry,
        industryDetails: (input.industryDetails ?? {}) as Record<string, unknown>,
        problem: input.problem,
        currentSolution: input.currentSolution ?? null,
        goalIn3Months: input.goalIn3Months,
        budget: input.budget,
        timeline: input.timeline,
      })
      .returning();
    const [row] = await withTimeout(insertPromise, DB_TIMEOUT_MS, "leads.insert");
    if (row) {
      savedRow = row;
      req.log.info({ leadId: row.id }, "Lead captured");
    }
  } catch (err) {
    req.log.error({ err }, "Lead DB insert failed — notifications will still fire");
  }

  res.status(201).json(savedRow ?? { id: null, ...input });

  // Fire notifications AFTER responding. Both are best-effort and independent.
  // We use the input directly so notifications work even when the DB is down.
  const notifyPayload = {
    name: input.name,
    businessName: input.businessName ?? null,
    whatsappNumber: input.whatsappNumber,
    email: input.email ?? null,
    city: input.city,
    industry: input.industry,
    problem: input.problem,
    goalIn3Months: input.goalIn3Months,
    budget: input.budget,
    timeline: input.timeline,
  };

  void (async () => {
    try {
      const sent = await sendWhatsApp(formatLeadMessage(notifyPayload));
      if (sent && savedRow) {
        try {
          await withTimeout(
            db
              .update(leadsTable)
              .set({ whatsappNotificationSent: true })
              .where(eq(leadsTable.id, savedRow.id)),
            DB_TIMEOUT_MS,
            "leads.update.whatsappSent",
          );
        } catch (err) {
          logger.warn({ err, leadId: savedRow.id }, "Failed to flag whatsappSent");
        }
        logger.info({ leadId: savedRow.id }, "WhatsApp delivered on first try");
      } else if (!sent && savedRow) {
        logger.warn({ leadId: savedRow.id }, "WhatsApp first attempt failed — queuing retry");
        await scheduleRetry(savedRow.id, 0).catch((err) =>
          logger.error({ err, leadId: savedRow!.id }, "scheduleRetry failed"),
        );
      } else if (!sent) {
        logger.warn("WhatsApp send failed and no DB row to retry against");
      }
    } catch (err) {
      logger.error({ err }, "Async WhatsApp dispatch threw");
    }
  })();

  void sendNotificationEmail(formatLeadEmail(notifyPayload)).catch((err) =>
    logger.error({ err }, "Lead email dispatch threw"),
  );
});

export default router;

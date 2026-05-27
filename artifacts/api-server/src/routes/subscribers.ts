import { Router, type IRouter } from "express";
import { db, subscribersTable } from "@workspace/db";
import { CreateSubscriberBody } from "@workspace/api-zod";
import { and, eq } from "drizzle-orm";
import { withTimeout } from "../lib/with-timeout";

const router: IRouter = Router();

const DB_TIMEOUT_MS = 3000;

router.post("/subscribers", async (req, res): Promise<void> => {
  const parsed = CreateSubscriberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();
  const source = parsed.data.source.trim();

  // Try to persist (idempotent: dedupe on email+source). If the DB is slow
  // or unreachable, fall through to a 201 with a synthetic response so the
  // user's flow continues unbroken.
  try {
    const existing = await withTimeout(
      db
        .select()
        .from(subscribersTable)
        .where(and(eq(subscribersTable.email, email), eq(subscribersTable.source, source)))
        .limit(1),
      DB_TIMEOUT_MS,
      "subscribers.select",
    );

    if (existing[0]) {
      res.status(201).json(existing[0]);
      return;
    }

    const [row] = await withTimeout(
      db.insert(subscribersTable).values({ email, source }).returning(),
      DB_TIMEOUT_MS,
      "subscribers.insert",
    );

    if (row) {
      req.log.info({ subscriberId: row.id, source }, "Subscriber captured");
      res.status(201).json(row);
      return;
    }
  } catch (err) {
    req.log.error({ err }, "Subscriber DB op failed — responding OK so frontend flow continues");
  }

  // DB unavailable fallback: respond OK with a synthetic row so the frontend
  // never sees an error. The email was validated; the loss is the persisted record.
  res.status(201).json({
    id: null,
    email,
    source,
    createdAt: new Date().toISOString(),
  });
});

export default router;

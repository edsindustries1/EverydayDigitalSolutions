import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import path from "node:path";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.disable("x-powered-by");

app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
const corsOrigin = process.env["CORS_ORIGIN"];
app.use(
  cors({
    origin: corsOrigin
      ? corsOrigin.split(",").map((o) => o.trim()).filter(Boolean)
      : ["https://everydaydigitalsolutions.com"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Static + SPA fallback. PUBLIC_DIR is set in the Dockerfile to the directory
// containing the Vite-built frontend. If unset (dev), this whole block no-ops.
const publicDir = process.env["PUBLIC_DIR"];
if (publicDir && fs.existsSync(publicDir)) {
  const publicDirResolved = path.resolve(publicDir);
  // redirect: false disables the default trailing-slash 301 — we serve the
  // prerendered <path>/index.html directly via the middleware below.
  app.use(
    express.static(publicDir, {
      maxAge: "1d",
      index: "index.html",
      redirect: false,
    }),
  );
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    let reqPath: string;
    try {
      reqPath = decodeURIComponent(req.path);
    } catch {
      return next();
    }
    if (reqPath.includes("\0")) return next();
    const candidate = path.resolve(path.join(publicDirResolved, reqPath, "index.html"));
    if (
      candidate !== path.join(publicDirResolved, "index.html") &&
      !candidate.startsWith(publicDirResolved + path.sep)
    ) {
      return next();
    }
    fs.stat(candidate, (err, stat) => {
      if (err || !stat.isFile()) return next();
      res.sendFile(candidate);
    });
  });
  const indexHtml = path.join(publicDir, "index.html");
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(indexHtml);
  });
}

export default app;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isBuild = process.env.NODE_ENV === "production" || process.argv.includes("build");
const isReplit = process.env.REPL_ID !== undefined;

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;

const basePath = process.env.BASE_PATH ?? "/";

// Local dev: forward /api/* to a locally-running api-server so forms like the
// lead-magnet subscriber capture work end-to-end. In production, api-server
// serves both /api/* and the static site on the same origin (see Dockerfile).
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET ?? "http://localhost:4000";

if (!isBuild && isReplit && !process.env.PORT) {
  throw new Error("PORT environment variable is required in Replit dev mode.");
}

const replitPlugins =
  !isBuild && isReplit
    ? await Promise.all([
        import("@replit/vite-plugin-runtime-error-modal").then((m) => m.default()),
        import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer({
            root: path.resolve(import.meta.dirname, ".."),
          }),
        ),
        import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
      ])
    : [];

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), ...replitPlugins],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

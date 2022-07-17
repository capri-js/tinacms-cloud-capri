import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

import { defineConfig } from "vite";

export default defineConfig(async () => {
  const { default: capri } = await import("@capri-js/react");
  return {
    build: {
      commonjsOptions: {
        requireReturnsDefault: "auto",
      },
    },
    define: {
      "process.platform": "'browser'",
    },
    legacy: {
      buildSsrCjsExternalHeuristics: true,
    },
    ssr: {
      format: "cjs",
    },
    plugins: [
      EnvironmentPlugin("all", { prefix: "NEXT_PUBLIC_" }),
      react(),
      capri({
        spa: "/admin",
      }),
    ],
  };
});

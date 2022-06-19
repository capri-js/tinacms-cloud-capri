import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const capri = await import("@capri-js/react/vite-plugin");
  return {
    resolve: {
      alias: [{ find: "moment", replacement: "moment/moment.js" }],
    },
    define: {
      "process.platform": "'browser'",
    },
    //@ts-ignore the ssr config is experimental
    ssr: {
      external: ["node-fetch"],
    },
    plugins: [
      react(),
      capri.default({
        ssrFormat: "commonjs",
        spa: "/admin",
      }),
      EnvironmentPlugin("all", { prefix: "NEXT_PUBLIC_" }),
    ],
  };
});

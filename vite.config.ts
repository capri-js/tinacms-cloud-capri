import capri from "@capri-js/react/vite-plugin";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting/index.js";
import { defineConfig } from "vite";

export default defineConfig((env) => ({
  define:
    env.command === "serve"
      ? {}
      : {
          "tinacms/dist/client": "tinacms/dist/client.js",
        },
  //@ts-ignore the ssr config is experimental and therefore not included UserConfig
  ssr: {
    external: ["node-fetch"],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-datetime"])],
    },
  },
  css: {
    postcss: {
      plugins: [postcssImport, tailwindcssNesting, tailwindcss, autoprefixer],
    },
  },
  plugins: [
    react(),
    capri({
      spa: "/admin",
    }),
    // schema.js is required() from @tinacms/cli so we can't use
    // import.meta.env there. Hence we have to use the EnvironmentPlugin
    // instead:
    EnvironmentPlugin([
      "TINA_CLOUDINARY_CLOUD_NAME",
      "TINA_CLOUDINARY_API_KEY",
      "TINA_HIDE_EDIT_BUTTON",
      "TINA_CLIENT_ID",
      "NEXT_PUBLIC_TINA_CLIENT_ID",
    ]),
  ],
}));

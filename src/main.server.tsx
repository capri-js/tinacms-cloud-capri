import "./tina/fetchPolyfill";
import { RenderFunction, renderToString } from "@capri-js/react/server";
import { StaticRouter } from "react-router-dom/server.js";
import { FilledContext, HelmetProvider } from "react-helmet-async";

import { App } from "./App";

export const render: RenderFunction = async (url: string) => {
  const helmetContext: FilledContext = {} as any;

  if (url === "/admin") {
    // On the server the /admin page is empty as it is an SPA:
    return { "#root": "" };
  }
  const html = await renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  const head = [helmet.title, helmet.meta, helmet.link].join("");
  return {
    head,
    "#root": html,
  };
};

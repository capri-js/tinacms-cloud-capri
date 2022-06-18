import fetch, { Headers, Request, Response } from "node-fetch";

// Tina's staticRequest expects a global fetch which is always present in
// Next.js. Since we don't use Next, we have to polyfill it for Node < 18.

if (!globalThis.fetch) {
  Object.assign(globalThis, {
    fetch,
    Headers,
    Request,
    Response,
  });
}

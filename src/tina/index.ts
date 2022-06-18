// While Tina ships ES modules, Node does not recognize them as such as they
// are named .es.js rather than .mjs. We therefore have to use the CommonJS
// version. In development mode Vite uses esbuild to convert these dependencies
// to ESM which works fine. In production mode, @rollup/plugin-commonjs is
// used instead which unfortunately yields a different result, namely the named
// exports wrapped inside `default`. We therefore use this interop helper to
// make sure it works in both cases.

import * as richText from "tinacms/dist/rich-text.js";
import * as editState from "tinacms/dist/edit-state.js";
import * as tinacms from "tinacms";

function interop<T>(module: T) {
  return ((module as any).default ?? module) as T;
}

const { TinaMarkdown } = interop(richText);
const { useTina } = interop(editState);
const { staticRequest } = interop(tinacms);

export { TinaMarkdown, useTina as useTinaEdit, staticRequest };

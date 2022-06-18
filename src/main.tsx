import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { TinaAdmin } from "tinacms";
import { TinaProvider } from "./tina/TinaProvider";
import { App } from "./App";
import {
  BrowserRouter,
  Route,
  Routes,
  UNSAFE_LocationContext,
  useNavigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/**
 * When opening a page for editing within the admin UI, Tina navigates there
 * by setting `window.location.href`. In an SSR environment this would be okay
 * but we need to make sure we stay within our SPA.
 * Therefore our RouteMappingPlugin in schema.ts prefixes all URLs with
 * "#preview". We intercept this and perform a navigation via useNavigate()
 * to the actual URL.
 */
function usePreview() {
  const navigate = useNavigate();
  useEffect(() => {
    const onHashChange = () => {
      // Check if the hash starts with #preview/
      const [, preview] = /^#preview(\/.*)/.exec(location.hash) ?? [];
      if (preview) {
        // if so, navigate there using the history API
        navigate(preview);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  });
}

function Admin() {
  usePreview();
  // Tina uses a HashRouter which will complain, if it sees that it is nested
  // inside our BrowserRouter. So we use this trick to make us invisible:
  return (
    <UNSAFE_LocationContext.Provider value={null as any}>
      <TinaAdmin />
    </UNSAFE_LocationContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TinaProvider>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </TinaProvider>
);

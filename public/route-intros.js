const ROUTE_INTRO_KEY = "route-intro-next-route";
const ROUTE_PATHS = new Set(["/", "/about", "/projects", "/contact"]);
const ROOT_SELECTOR = "[data-route-intro-root]";
const PAGE_TITLE_STATE_DURATION = 780;
const HOME_TITLE_STATE_DURATION = 900;
const GREETING_STATE_DURATION = 1280;
const REVEAL_CLEANUP_DELAY = 320;

const normalizePath = (value) => {
  if (value === "/") {
    return value;
  }

  const path = value.replace(/\/+$/, "");
  return path.length > 0 ? path : "/";
};

const readConfig = () => {
  const configElement = document.getElementById("route-intro-config");

  if (!configElement) {
    return { homeGreetings: [], mainRouteTitles: {} };
  }

  try {
    return JSON.parse(configElement.textContent || "{}");
  } catch {
    return { homeGreetings: [], mainRouteTitles: {} };
  }
};

const readHandoff = () => {
  try {
    const value = sessionStorage.getItem(ROUTE_INTRO_KEY);
    sessionStorage.removeItem(ROUTE_INTRO_KEY);

    if (!value) {
      return null;
    }

    const parsed = JSON.parse(value);

    if (typeof parsed === "object" && parsed !== null && typeof parsed.path === "string") {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

const writeHandoff = (path) => {
  try {
    sessionStorage.setItem(ROUTE_INTRO_KEY, JSON.stringify({ path }));
  } catch {
    // Fall back to plain navigation if storage is unavailable.
  }
};

const isMainRouteLink = (anchor) => {
  if (!anchor || anchor.target || anchor.hasAttribute("download")) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (url.origin !== currentUrl.origin) {
    return false;
  }

  return ROUTE_PATHS.has(normalizePath(url.pathname));
};

const getRouteTitle = (config, path, fallback) => {
  return config.mainRouteTitles?.[path] || fallback;
};

const markReady = () => {
  document.documentElement.dataset.routeIntroReady = "true";
};

const clearPending = () => {
  delete document.documentElement.dataset.routeIntroPending;
};

const clearRuntimeState = () => {
  delete document.documentElement.dataset.routeIntroActive;
  delete document.documentElement.dataset.routeIntroComplete;
};

const installRouteInterceptor = () => {
  document.addEventListener(
    "click",
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;

      if (!isMainRouteLink(target)) {
        return;
      }

      event.preventDefault();
      writeHandoff(normalizePath(new URL(target.href, window.location.href).pathname));
      window.location.assign(target.href);
    },
    true,
  );
};

const clearRootState = (root) => {
  delete root.dataset.routeIntroVisible;
  delete root.dataset.routeIntroState;
};

const init = () => {
  markReady();
  installRouteInterceptor();

  const root = document.querySelector(ROOT_SELECTOR);

  if (!root) {
    return;
  }

  const heading = root.querySelector("[data-route-intro-heading]");
  const greeting = root.querySelector("[data-route-intro-greeting]");
  const marker = root.querySelector("[data-route-intro-marker]");
  const content = document.querySelector("[data-route-intro-content]");

  if (!heading || !greeting || !marker || !content) {
    clearPending();
    return;
  }

  const config = readConfig();
  const path = normalizePath(window.location.pathname);

  if (!ROUTE_PATHS.has(path)) {
    clearPending();
    return;
  }

  const handoff = readHandoff();
  const internalNav = handoff?.path === path;
  const mode = path === "/" ? (internalNav ? "home-title" : "home-greetings") : "page-title";
  const title = getRouteTitle(config, path, heading.textContent || "");
  const greetings = Array.isArray(config.homeGreetings) ? config.homeGreetings : [];
  const introDuration =
    mode === "home-greetings"
      ? GREETING_STATE_DURATION
      : mode === "home-title"
        ? HOME_TITLE_STATE_DURATION
        : PAGE_TITLE_STATE_DURATION;
  const body = document.body;

  heading.textContent = title;
  marker.textContent = "•";
  root.hidden = false;
  root.dataset.routeIntroVisible = "true";
  root.dataset.routeIntroState = mode;
  document.documentElement.dataset.routeIntroActive = "true";
  clearPending();

  if (body) {
    body.classList.add("route-intro-active");
  }

  if (mode === "home-greetings" && greetings.length > 0) {
    let index = 0;
    greeting.textContent = greetings[index];

    const interval = window.setInterval(() => {
      index += 1;
      if (index >= greetings.length) {
        window.clearInterval(interval);
        return;
      }

      greeting.textContent = greetings[index];
    }, 120);

    window.setTimeout(() => {
      window.clearInterval(interval);
    }, introDuration - 100);
  } else {
    greeting.textContent = "";
  }

  window.setTimeout(() => {
    root.dataset.routeIntroVisible = "false";
    document.documentElement.dataset.routeIntroComplete = "true";

    window.setTimeout(() => {
      root.hidden = true;
      clearRootState(root);
      clearRuntimeState();

      if (body) {
        body.classList.remove("route-intro-active");
      }
    }, REVEAL_CLEANUP_DELAY);
  }, introDuration);
};

init();

document.documentElement.classList.add("js");

const header = document.querySelector("[data-site-header]");
const openButton = document.querySelector("[data-menu-open]");
const overlay = document.querySelector("[data-menu-overlay]");
const panel = document.querySelector("[data-menu-panel]");
const closeButton = document.querySelector(".menu-close[data-menu-close]");
const content = document.querySelector("[data-menu-content]");
const closeTargets = document.querySelectorAll("[data-menu-close]");
const navIndicatorRoots = Array.from(document.querySelectorAll("[data-nav-indicator-root]"));

const navIndicatorControllers = navIndicatorRoots
  .map((root) => {
    const indicator = root.querySelector("[data-nav-indicator]");
    const links = Array.from(root.querySelectorAll("[data-nav-indicator-link]"));

    if (!indicator || links.length === 0) {
      return null;
    }

    const offset = root.dataset.navIndicatorRoot === "overlay" ? 12 : 10;
    let currentLink = null;

    const getActiveLink = () => root.querySelector('[data-nav-indicator-link][aria-current="page"]');
    const isVisible = () => root.getClientRects().length > 0;

    const placeIndicator = (link) => {
      if (!link || !isVisible()) {
        return false;
      }

      const rootRect = root.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const x = linkRect.left - rootRect.left + linkRect.width / 2;
      const y = linkRect.bottom - rootRect.top + offset;

      indicator.style.setProperty("--nav-indicator-x", `${x}px`);
      indicator.style.setProperty("--nav-indicator-y", `${y}px`);
      root.dataset.navIndicatorReady = "true";
      return true;
    };

    const refresh = () => {
      if (!isVisible()) {
        currentLink = null;
        root.dataset.navIndicatorReady = "false";
        return false;
      }

      return placeIndicator(currentLink ?? getActiveLink());
    };

    const reset = () => {
      currentLink = null;
      placeIndicator(getActiveLink());
    };

    const activate = (link) => {
      currentLink = link;
      placeIndicator(link);
    };

    links.forEach((link) => {
      link.addEventListener("pointerenter", () => activate(link));
      link.addEventListener("focusin", () => activate(link));
    });

    root.addEventListener("pointerleave", () => {
      reset();
    });

    root.addEventListener("focusout", (event) => {
      const relatedTarget = event.relatedTarget;

      if (relatedTarget instanceof Node && root.contains(relatedTarget)) {
        return;
      }

      reset();
    });

    return {
      refresh,
      reset,
      root,
    };
  })
  .filter(Boolean);

const getIndicatorController = (rootName) =>
  navIndicatorControllers.find((controller) => controller.root.dataset.navIndicatorRoot === rootName);

const headerIndicator = getIndicatorController("header");
const overlayIndicator = getIndicatorController("overlay");

if (header) {
  const topNav = header.querySelector("[data-header-top-nav]");
  const trigger = header.querySelector("[data-header-menu-trigger]");
  const desktopQuery = window.matchMedia("(min-width: 721px)");
  const scrolledOffset = 24;

  const syncHeaderState = () => {
    if (!topNav || !trigger) {
      return;
    }

    const state = desktopQuery.matches
      ? window.scrollY > scrolledOffset
        ? "scrolled"
        : "top"
      : "mobile";

    header.dataset.headerState = state;
  };

  syncHeaderState();
  headerIndicator?.refresh();
  window.addEventListener(
    "scroll",
    () => {
      syncHeaderState();
      headerIndicator?.refresh();
    },
    { passive: true },
  );
  window.addEventListener(
    "resize",
    () => {
      syncHeaderState();
      headerIndicator?.refresh();
      overlayIndicator?.refresh();
    },
    { passive: true },
  );

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", syncHeaderState);
  }
}

if (openButton && overlay && panel) {
  const getFocusableElements = () =>
    Array.from(
      overlay.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden);

  const focusOnNextFrame = (element) => {
    if (!element) {
      return;
    }

    window.requestAnimationFrame(() => {
      element.focus();
    });
  };

  const getCloseFocusTarget = () => {
    const targets = [openButton, header?.querySelector("[data-header-top-nav] a"), header?.querySelector(".site-brand")];

    return targets.find((element) => element && element.getClientRects().length > 0) ?? openButton;
  };

  const syncState = (isOpen) => {
    openButton.setAttribute("aria-expanded", String(isOpen));
    overlay.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    if (content) {
      content.toggleAttribute("inert", isOpen);
      content.setAttribute("aria-hidden", String(isOpen));
    }
  };

  const openMenu = () => {
    syncState(true);
    window.requestAnimationFrame(() => {
      overlayIndicator?.refresh();
    });
    focusOnNextFrame(closeButton ?? panel);
  };

  const closeMenu = () => {
    overlayIndicator?.reset();
    syncState(false);
    focusOnNextFrame(getCloseFocusTarget());
  };

  openButton.addEventListener("click", openMenu);

  closeTargets.forEach((element) => {
    element.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeMenu();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const activeElement = document.activeElement;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
}

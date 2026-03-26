document.documentElement.classList.add("js");

const header = document.querySelector("[data-site-header]");
const openButton = document.querySelector("[data-menu-open]");
const overlay = document.querySelector("[data-menu-overlay]");
const panel = document.querySelector("[data-menu-panel]");
const closeButton = document.querySelector(".menu-close[data-menu-close]");
const content = document.querySelector("[data-menu-content]");
const closeTargets = document.querySelectorAll("[data-menu-close]");

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
  window.addEventListener("scroll", syncHeaderState, { passive: true });
  window.addEventListener("resize", syncHeaderState);

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
    focusOnNextFrame(closeButton ?? panel);
  };

  const closeMenu = () => {
    syncState(false);
    focusOnNextFrame(openButton);
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

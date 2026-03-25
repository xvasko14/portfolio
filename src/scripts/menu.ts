document.documentElement.classList.add("js");

const openButton = document.querySelector<HTMLElement>("[data-menu-open]");
const overlay = document.querySelector<HTMLElement>("[data-menu-overlay]");
const panel = document.querySelector<HTMLElement>("[data-menu-panel]");
const closeButton = document.querySelector<HTMLElement>(".menu-close[data-menu-close]");
const content = document.querySelector<HTMLElement>("[data-menu-content]");
const closeTargets = document.querySelectorAll<HTMLElement>("[data-menu-close]");

if (openButton && overlay && panel) {
  const getFocusableElements = () =>
    Array.from(
      overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden);

  const syncState = (isOpen: boolean) => {
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
    (closeButton ?? panel).focus();
  };

  const closeMenu = () => {
    syncState(false);
    openButton.focus();
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

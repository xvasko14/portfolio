const openButton = document.querySelector<HTMLElement>("[data-menu-open]");
const overlay = document.querySelector<HTMLElement>("[data-menu-overlay]");
const panel = document.querySelector<HTMLElement>("[data-menu-panel]");
const closeButton = document.querySelector<HTMLElement>(".menu-close[data-menu-close]");
const content = document.querySelector<HTMLElement>("[data-menu-content]");
const closeTargets = document.querySelectorAll<HTMLElement>("[data-menu-close]");

if (openButton && overlay && panel) {
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
    if (event.key === "Escape" && !overlay.hidden) {
      closeMenu();
    }
  });
}

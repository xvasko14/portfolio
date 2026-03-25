const openButton = document.querySelector<HTMLElement>("[data-menu-open]");
const overlay = document.querySelector<HTMLElement>("[data-menu-overlay]");
const closeTargets = document.querySelectorAll<HTMLElement>("[data-menu-close]");

if (openButton && overlay) {
  const syncState = (isOpen: boolean) => {
    openButton.setAttribute("aria-expanded", String(isOpen));
    overlay.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
  };

  const openMenu = () => {
    syncState(true);
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

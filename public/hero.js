const photo = document.querySelector("[data-hero-photo]");
const name = document.querySelector("[data-hero-name]");

if (photo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        photo.style.transform = `translateY(${y * 0.35}px)`;
        if (name) {
          name.style.transform = `translateX(${-y * 0.25}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

const photo = document.querySelector("[data-hero-photo]");

if (photo && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        photo.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

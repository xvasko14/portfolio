const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

if (revealTargets.length > 0) {
  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((element) => {
    const delay = element.dataset.revealDelay;

    if (delay) {
      element.style.setProperty("--reveal-delay", delay);
    }
  });

  const showElement = (element: HTMLElement) => {
    element.classList.add("is-visible");
  };

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(showElement);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          showElement(target);
          observer.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    revealTargets.forEach((element) => {
      observer.observe(element);
    });
  }
}

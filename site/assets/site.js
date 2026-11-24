// Animaciones progresivas: si no hay JS u observer, los diagramas se ven completos.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const diagrams = document.querySelectorAll("main svg.diagram");
  if (!diagrams.length) return;

  document.documentElement.classList.add("js");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
  );

  for (const diagram of diagrams) observer.observe(diagram);
})();

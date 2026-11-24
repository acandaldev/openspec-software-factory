// Fase 1 de movimiento: GSAP + ScrollTrigger, self-hosted.
// Si falta GSAP, el navegador no soporta algo o el usuario prefiere menos
// movimiento, no se añade la clase .js y todo el contenido queda visible.
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !window.gsap || !window.ScrollTrigger) return;

  try {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("js");

    // Barra de progreso de lectura.
    gsap.to(".progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
      },
    });

    // Aparición de secciones y diagramas.
    for (const element of document.querySelectorAll("[data-reveal]")) {
      gsap.fromTo(
        element,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        },
      );
    }

    // Diagramas: líneas, estado de mutación, punto de flujo y grupos.
    for (const svg of document.querySelectorAll("main svg.diagram")) {
      const paths = svg.querySelectorAll(".draw");
      if (paths.length) {
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.08,
          scrollTrigger: { trigger: svg, start: "top 78%", once: true },
        });
      }

      const gate = svg.querySelector(".gate-state");
      if (gate) {
        gsap
          .timeline({ scrollTrigger: { trigger: svg, start: "top 75%", once: true } })
          .to(gate, { fill: "#f87171", duration: 0.35, delay: 0.7 })
          .to(gate, { fill: "#6ee7a8", duration: 0.35, delay: 0.7 });
      }

      const fadeGroups = svg.querySelectorAll(".fade");
      if (fadeGroups.length) {
        gsap.from(fadeGroups, {
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        });
      }

      const flow = svg.querySelector("path[id^='task-flow']");
      const dot = svg.querySelector("circle[id^='task-dot']");
      if (flow && dot) {
        const length = flow.getTotalLength();
        const position = { t: 0 };
        gsap.to(position, {
          t: 1,
          duration: 8,
          repeat: -1,
          ease: "none",
          scrollTrigger: {
            trigger: svg,
            start: "top 70%",
            toggleActions: "play pause resume pause",
          },
          onUpdate: () => {
            const point = flow.getPointAtLength(position.t * length);
            dot.setAttribute("cx", point.x);
            dot.setAttribute("cy", point.y);
            dot.setAttribute("opacity", "1");
          },
        });
      }
    }

    // TOC activo según la sección visible.
    const setActive = (id) => {
      for (const link of document.querySelectorAll(".toc a[href^='#'], .toc-mobile a[href^='#']")) {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      }
    };
    for (const heading of document.querySelectorAll("main h2[id]")) {
      ScrollTrigger.create({
        trigger: heading,
        start: "top 120px",
        end: "bottom 120px",
        onToggle: (self) => {
          if (self.isActive) setActive(heading.id);
        },
      });
    }

    // Entrada del hero.
    gsap.from("main h1", { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" });

    window.addEventListener("load", () => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  } catch (error) {
    document.documentElement.classList.remove("js");
    try {
      gsap.set("[data-reveal], main h1", { clearProps: "opacity,transform" });
    } catch {
      // Si GSAP ya no responde, el CSS sin .js deja el contenido visible.
    }
    console.error("No se pudo inicializar el movimiento del sitio.", error);
  }
})();

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

    // Entrada de la portada: badge, fases, arranque y código.
    const index = document.querySelector(".page-index");
    if (index) {
      const badge = index.querySelector(".hero-badge");
      if (badge) {
        gsap.from(badge, { opacity: 0, y: 8, duration: 0.5, ease: "power1.out" });
      }

      const story = index.querySelector(".story");
      if (story) {
        const cards = story.querySelectorAll(".story-step");
        const arrows = story.querySelectorAll(".story-arrow");
        const loop = story.querySelector(".story-loop");
        const clearTargets = [story, ...cards, ...arrows];
        if (loop) clearTargets.push(loop);
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: story, start: "top 86%", once: true },
          onComplete: () => gsap.set(clearTargets, { clearProps: "transform" }),
        });
        timeline
          .from(story, { opacity: 0, y: 10, duration: 0.35, ease: "power1.out" })
          .from(cards, { opacity: 0, y: 18, duration: 0.5, stagger: 0.09, ease: "power2.out" }, "-=0.15")
          .from(arrows, { opacity: 0, x: -8, duration: 0.3, stagger: 0.09, ease: "power1.out" }, "-=0.4");
        if (loop) {
          timeline.from(loop, { opacity: 0, duration: 0.3 }, "-=0.15");
        }
      }

      const sectionHead = index.querySelectorAll(".section-kicker, .section-title");
      if (sectionHead.length) {
        gsap.from(sectionHead, {
          opacity: 0,
          y: 8,
          duration: 0.4,
          stagger: 0.06,
          ease: "power1.out",
          scrollTrigger: { trigger: sectionHead[0], start: "top 90%", once: true },
        });
      }

      const setup = index.querySelector(":scope > ol");
      if (setup) {
        const items = Array.from(setup.children);
        gsap.from(items, {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: { trigger: setup, start: "top 90%", once: true },
          onComplete: () => gsap.set(items, { clearProps: "transform" }),
        });
      }

      const code = index.querySelector("pre");
      if (code) {
        gsap.from(code, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: { trigger: code, start: "top 92%", once: true },
        });
      }
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
      gsap.set(
        "[data-reveal], main h1, .page-index .hero-badge, .page-index .story, .page-index .story-step, .page-index .story-arrow, .page-index .story-loop, .page-index .section-kicker, .page-index .section-title, .page-index > ol > li, .page-index pre",
        { clearProps: "opacity,transform" },
      );
    } catch {
      // Si GSAP ya no responde, el CSS sin .js deja el contenido visible.
    }
    console.error("No se pudo inicializar el movimiento del sitio.", error);
  }
})();

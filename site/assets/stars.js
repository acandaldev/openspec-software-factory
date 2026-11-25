// Contador público de estrellas del repo del template.
// Sin token ni cookies: una petición por navegador y hora, y el enlace sigue
// funcionando aunque GitHub no responda (el número queda oculto o cacheado).
(() => {
  const element = document.querySelector("[data-github-stars]");
  if (!element) return;

  const repoUrl = element.dataset.githubRepo;
  if (!repoUrl) return;

  let repoPath;
  try {
    repoPath = new URL(repoUrl).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return;
  }
  if (!repoPath) return;

  const cacheKey = `ossf:stars:${repoPath}`;
  const cacheTtl = 60 * 60 * 1000;
  const format = new Intl.NumberFormat(document.documentElement.lang || "es");

  const render = (count) => {
    element.textContent = format.format(count);
    element.hidden = false;
  };

  const readCache = () => {
    try {
      return JSON.parse(localStorage.getItem(cacheKey) || "null");
    } catch {
      return null;
    }
  };

  const writeCache = (count) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ count, ts: Date.now() }));
    } catch {
      // Sin almacenamiento: se vuelve a pedir en la siguiente carga.
    }
  };

  const cached = readCache();
  if (cached && typeof cached.count === "number") {
    render(cached.count);
    if (typeof cached.ts === "number" && Date.now() - cached.ts < cacheTtl) return;
  }

  const options = { headers: { Accept: "application/vnd.github+json" } };
  if (typeof AbortSignal !== "undefined" && AbortSignal.timeout) {
    options.signal = AbortSignal.timeout(5000);
  }

  fetch(`https://api.github.com/repos/${repoPath}`, options)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (typeof data.stargazers_count !== "number") return;
      render(data.stargazers_count);
      writeCache(data.stargazers_count);
    })
    .catch(() => {
      // Si GitHub no responde, se mantiene el valor cacheado o se oculta.
    });
})();

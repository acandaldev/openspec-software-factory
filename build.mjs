#!/usr/bin/env node
// Generador estático sin dependencias.
//   node build.mjs
// Lee content/<lang>/<slug>.md, data/template.json y site/assets, y escribe dist/.

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, "dist");
const LANGS = ["es", "en"];
const PAGES = JSON.parse(readFileSync(path.join(ROOT, "content", "pages.json"), "utf8"));
const NAV_PAGES = PAGES.filter((page) => page.nav);
const TEMPLATE = JSON.parse(readFileSync(path.join(ROOT, "data", "template.json"), "utf8"));
const SITE = TEMPLATE.site.replace(/\/+$/, "");

function subst(s, ctx) {
  return s.replace(/\{\{([\w.]+)\}\}/g, (_, k) => {
    const v = k.split(".").reduce((o, p) => (o == null ? o : o[p]), ctx);
    return v == null ? `{{${k}}}` : String(v);
  });
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s, ctx) {
  return esc(subst(s, ctx))
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function plain(s) {
  return s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function slugify(s) {
  return plain(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "seccion";
}

// Convierte un H1 de fragmento en H2, su H2 en H3, etc. No toca bloques de código.
function demote(md) {
  let fenced = false;
  return md
    .split("\n")
    .map((line) => {
      if (line.trimStart().startsWith("```")) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;
      return line.replace(/^(#{1,4})\s/, (_, hashes) => `${hashes}# `);
    })
    .join("\n");
}

function renderTable(rows, ctx) {
  const cells = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  const th = head.map((c) => `<th>${inline(c, ctx)}</th>`).join("");
  const tb = body
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c, ctx)}</td>`).join("")}</tr>`)
    .join("\n");
  return `<div class="table-wrap"><table><thead><tr>${th}</tr></thead><tbody>${tb}</tbody></table></div>`;
}

function markdown(md, ctx, toc) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  const usedIds = new Map();
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const buf = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
      i += 1;
      out.push(`<pre><code${lang ? ` class="lang-${esc(lang)}"` : ""}>${esc(buf.join("\n"))}</code></pre>`);
      continue;
    }
    if (line.trimStart().startsWith("<")) {
      const buf = [line];
      const open = line.includes("<svg");
      i += 1;
      if (open) {
        while (i < lines.length && !buf.join("\n").includes("</svg>")) buf.push(lines[i++]);
      } else {
        while (i < lines.length && lines[i].trim()) buf.push(lines[i++]);
      }
      const raw = subst(buf.join("\n"), ctx);
      out.push(open ? `<div class="diagram-wrap" data-reveal>${raw}</div>` : raw);
      continue;
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      let id = "";
      if (level === 2 || level === 3) {
        const base = slugify(h[2]);
        const n = (usedIds.get(base) ?? 0) + 1;
        usedIds.set(base, n);
        id = n === 1 ? base : `${base}-${n}`;
        if (level === 2) toc.push({ id, text: h[2] });
      }
      const reveal = level === 2 ? " data-reveal" : "";
      out.push(`<h${level}${id ? ` id="${id}"` : ""}${reveal}>${inline(h[2], ctx)}</h${level}>`);
      i += 1;
      continue;
    }
    if (line.startsWith("|")) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith("|")) buf.push(lines[i++]);
      out.push(renderTable(buf, ctx));
      continue;
    }
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const tag = ordered ? "ol" : "ul";
      const buf = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) {
        buf.push(`<li>${inline(lines[i].replace(/^(- |\d+\. )/, ""), ctx)}</li>`);
        i += 1;
      }
      out.push(`<${tag}>${buf.join("")}</${tag}>`);
      continue;
    }
    if (line.startsWith("> ")) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(inline(lines[i].slice(2), ctx));
        i += 1;
      }
      out.push(`<blockquote><p>${buf.join("<br>")}</p></blockquote>`);
      continue;
    }
    const buf = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4} |\||- |\d+\. |> |```|<)/.test(lines[i])
    ) {
      buf.push(lines[i++]);
    }
    out.push(`<p>${inline(buf.join(" "), ctx)}</p>`);
  }
  return out.join("\n");
}

function titleOf(md) {
  const m = /^#\s+(.*)$/m.exec(md);
  return m ? m[1].replace(/\{\{[^}]+\}\}/g, "").trim() : "OpenSpec Software Factory";
}

function tocList(toc, ctx) {
  return `<ol>${toc.map((x) => `<li><a href="#${x.id}">${inline(x.text, ctx)}</a></li>`).join("")}</ol>`;
}

function layout({ lang, page, title, description, body, toc, ctx }) {
  const other = lang === "es" ? "en" : "es";
  const pageUrl = `${SITE}/${lang}/${page.slug}.html`;
  const alternateUrl = `${SITE}/${other}/${page.slug}.html`;
  const defaultUrl = `${SITE}/es/${page.slug}.html`;
  const navLabel = lang === "es" ? "Principal" : "Main";
  const nav = NAV_PAGES.map((p) => {
    const active = p.slug === page.slug ? ' class="active"' : "";
    return `<a href="${p.slug}.html"${active}>${p.nav[lang]}</a>`;
  }).join("");
  const langLabel = lang === "es" ? "EN" : "ES";
  const tocLabel = lang === "es" ? "En esta página" : "On this page";
  const mobileToc = toc.length
    ? `<details class="toc-mobile"><summary>${tocLabel}</summary>${tocList(toc, ctx)}</details>`
    : "";
  const desktopToc = toc.length
    ? `<aside class="toc"><p>${tocLabel}</p>${tocList(toc, ctx)}</aside>`
    : "";
  const mainBody = body.includes("<!-- TOC -->")
    ? body.replace("<!-- TOC -->", mobileToc)
    : mobileToc + body;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#0a0e12">
<title>${esc(title)} · OpenSpec Software Factory</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${pageUrl}">
<link rel="alternate" hreflang="${lang}" href="${pageUrl}">
<link rel="alternate" hreflang="${other}" href="${alternateUrl}">
<link rel="alternate" hreflang="x-default" href="${defaultUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="OpenSpec Software Factory">
<meta property="og:title" content="${esc(title)} · OpenSpec Software Factory">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:locale" content="${lang === "es" ? "es_ES" : "en_US"}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)} · OpenSpec Software Factory">
<meta name="twitter:description" content="${esc(description)}">
<link rel="stylesheet" href="../assets/style.css">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
</head>
<body>
<div class="progress" aria-hidden="true"></div>
<header class="top">
  <a class="brand" href="index.html"><span class="mark">▦</span> OpenSpec <em>Software Factory</em></a>
  <nav aria-label="${navLabel}">${nav}<a class="ext" href="${TEMPLATE.repository}" target="_blank" rel="noopener">GitHub</a></nav>
  <a class="lang" href="../${other}/${page.slug}.html" hreflang="${other}">${langLabel}</a>
</header>
<div class="shell">
  <main>
${mainBody}
  </main>
  ${desktopToc}
</div>
<footer>
  <p>MIT · <a href="${TEMPLATE.repository}">GitHub</a> · ${lang === "es" ? "Documentación viva del método" : "Living documentation of the method"}</p>
</footer>
<script src="../assets/vendor/gsap.min.js" defer></script>
<script src="../assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="../assets/motion.js" defer></script>
</body>
</html>
`;
}

function redirectPage(lang, target) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE}/${lang}/${target}">
<title>Redirigiendo…</title>
</head>
<body>
<p>Esta página se ha movido a <a href="${target}">${target}</a>.</p>
</body>
</html>
`;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(path.join(ROOT, "site", "assets"), path.join(DIST, "assets"), { recursive: true });

let redirectCount = 0;
for (const lang of LANGS) {
  mkdirSync(path.join(DIST, lang), { recursive: true });
  for (const page of PAGES) {
    const intro = readFileSync(path.join(ROOT, "content", lang, `${page.intro}.md`), "utf8");
    const sources = (page.sources ?? []).map((source) =>
      demote(readFileSync(path.join(ROOT, "content", lang, `${source}.md`), "utf8")),
    );
    const ctx = { repo: TEMPLATE.repository };
    const toc = [];
    const body = markdown([intro, ...sources].join("\n\n"), ctx, toc);
    const html = layout({
      lang,
      page,
      title: titleOf(intro),
      description: page.description[lang],
      body,
      toc,
      ctx,
    });
    writeFileSync(path.join(DIST, lang, `${page.slug}.html`), html, "utf8");
  }
  for (const page of PAGES) {
    for (const from of page.redirects ?? []) {
      writeFileSync(
        path.join(DIST, lang, `${from}.html`),
        redirectPage(lang, `${page.slug}.html`),
        "utf8",
      );
      redirectCount += 1;
    }
  }
}

writeFileSync(
  path.join(DIST, "index.html"),
  `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=es/"><link rel="canonical" href="${SITE}/es/"><title>OpenSpec Software Factory</title>`,
  "utf8",
);

const sitemapUrls = LANGS.flatMap((lang) =>
  PAGES.map((page) => `  <url><loc>${SITE}/${lang}/${page.slug}.html</loc></url>`),
).join("\n");
writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
  "utf8",
);
writeFileSync(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`,
  "utf8",
);
writeFileSync(
  path.join(DIST, "404.html"),
  `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>404 · OpenSpec Software Factory</title>
<link rel="stylesheet" href="${SITE}/assets/style.css">
</head>
<body>
<main style="max-width:720px;margin:15vh auto;padding:0 24px">
<h1>404</h1>
<p>Esta página no existe. <a href="${SITE}/es/">Volver en español</a> · <a href="${SITE}/en/">Back in English</a>.</p>
</main>
</body>
</html>
`,
  "utf8",
);

console.log(
  `Generado dist/: ${PAGES.length} páginas × ${LANGS.length} idiomas + ${redirectCount} redirecciones + sitemap/robots/404`,
);

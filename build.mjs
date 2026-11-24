#!/usr/bin/env node
// Generador estático sin dependencias.
//   node build.mjs
// Lee content/<lang>/<slug>.md, data/metrics.json y site/assets, y escribe dist/.

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, "dist");
const LANGS = ["es", "en"];
const PAGES = JSON.parse(readFileSync(path.join(ROOT, "content", "pages.json"), "utf8"));
const DATA = JSON.parse(readFileSync(path.join(ROOT, "data", "metrics.json"), "utf8"));

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

function markdown(md, ctx) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
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
      out.push(subst(buf.join("\n"), ctx));
      continue;
    }
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2], ctx)}</h${level}>`);
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
      !/^(#{1,3} |\||- |\d+\. |> |```|<)/.test(lines[i])
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

function layout({ lang, page, title, description, body }) {
  const other = lang === "es" ? "en" : "es";
  const nav = PAGES.map((p) => {
    const active = p.slug === page.slug ? ' class="active"' : "";
    return `<a href="${p.slug}.html"${active}>${p.nav[lang]}</a>`;
  }).join("");
  const langLabel = lang === "es" ? "EN" : "ES";
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · OpenSpec Software Factory</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="../assets/style.css">
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="alternate" hreflang="${other}" href="../${other}/${page.slug}.html">
</head>
<body>
<header class="top">
  <a class="brand" href="index.html"><span class="mark">▦</span> OpenSpec <em>Software Factory</em></a>
  <nav>${nav}</nav>
  <a class="lang" href="../${other}/${page.slug}.html" hreflang="${other}">${langLabel}</a>
</header>
<main>
${body}
</main>
<footer>
  <p>MIT · <a href="${DATA.repo}">GitHub</a> · ${lang === "es" ? "Documentación viva del método" : "Living documentation of the method"}</p>
</footer>
</body>
</html>
`;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(path.join(ROOT, "site", "assets"), path.join(DIST, "assets"), { recursive: true });

for (const lang of LANGS) {
  mkdirSync(path.join(DIST, lang), { recursive: true });
  for (const page of PAGES) {
    const file = path.join(ROOT, "content", lang, `${page.slug}.md`);
    const md = readFileSync(file, "utf8");
    const ctx = { ...DATA.metrics, repo: DATA.repo };
    const html = layout({
      lang,
      page,
      title: titleOf(md),
      description: page.description[lang],
      body: markdown(md, ctx),
    });
    writeFileSync(path.join(DIST, lang, `${page.slug}.html`), html, "utf8");
  }
}

writeFileSync(
  path.join(DIST, "index.html"),
  `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=es/"><link rel="canonical" href="es/"><title>OpenSpec Software Factory</title>`,
  "utf8",
);

console.log(`Generado dist/: ${PAGES.length} páginas × ${LANGS.length} idiomas`);

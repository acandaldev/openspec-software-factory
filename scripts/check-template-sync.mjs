#!/usr/bin/env node
// Comprueba que el sitio sigue coordinado con el template:
//   - data/template.json es una copia exacta del manifiesto publicado;
//   - data/metrics.json enlaza al repositorio del manifiesto;
//   - TEMPLATE.md apunta a ese repositorio;
//   - las páginas de adopción mencionan la versión vigente.
//
// El manifiesto se lee de main mientras no haya una release estable. Cuando la
// haya, cambia MANIFEST_URL (o TEMPLATE_MANIFEST_URL) a la etiqueta fijada.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_URL =
  process.env.TEMPLATE_MANIFEST_URL ??
  "https://raw.githubusercontent.com/acandaldev/openspec-software-factory-template/main/template.json";
const RETRIES = 3;

async function readText(rel) {
  return readFile(path.join(ROOT, rel), "utf8");
}

async function readJson(rel) {
  return JSON.parse(await readText(rel));
}

async function fetchManifest() {
  let lastError;
  for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
    try {
      const response = await fetch(MANIFEST_URL, {
        headers: { "user-agent": "openspec-software-factory-site" },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
      }
    }
  }
  throw new Error(`No se pudo leer ${MANIFEST_URL}: ${lastError?.message ?? "error desconocido"}`);
}

const expected = await readJson("data/template.json");
const metrics = await readJson("data/metrics.json");
const actual = await fetchManifest();
const problems = [];

for (const key of new Set([...Object.keys(expected), ...Object.keys(actual)])) {
  if (!isDeepStrictEqual(actual[key], expected[key])) {
    problems.push(
      `${key}: el sitio espera ${JSON.stringify(expected[key])} y el template publica ${JSON.stringify(actual[key])}`,
    );
  }
}

if (metrics.repo !== expected.repository) {
  problems.push(`data/metrics.json: "repo" debe ser ${expected.repository}`);
}

const templateMd = await readText("TEMPLATE.md");
if (!templateMd.includes(expected.repository)) {
  problems.push(`TEMPLATE.md: no enlaza a ${expected.repository}`);
}

for (const lang of ["es", "en"]) {
  const page = await readText(`content/${lang}/adopcion.md`);
  if (!page.includes(expected.label)) {
    problems.push(`content/${lang}/adopcion.md: no menciona ${expected.label}`);
  }
}

if (problems.length > 0) {
  console.error(`\n${problems.length} desincronización(es) con el template:`);
  for (const problem of problems) console.error(`- ${problem}`);
  console.error("\nActualiza la copia del sitio o el manifiesto del template.");
  process.exit(1);
}

console.log(`Template ${expected.label} (${expected.version}) sincronizado con el sitio.`);

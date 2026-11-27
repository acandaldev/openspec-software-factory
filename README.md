# OpenSpec Software Factory

Sitio público del método: **OpenSpec + subagentes + gates + traza + curador**.

- `content/es/`, `content/en/` — fuente de las páginas en markdown.
- `content/pages.json` — seis páginas (landing, método, ejemplo, operación, adopción y FAQ) y los fragmentos que las componen; las URLs antiguas se generan como redirects.
- `TEMPLATE.md` — puntero al repositorio del template ejecutable.
- `data/template.json` — copia fijada del manifiesto del template (versión, repositorio, comandos y agentes).
- `site/assets/` — CSS, favicon, JS de movimiento y GSAP self-hosted.
- `build.mjs` — generador estático **sin dependencias**.

## Template

El template ejecutable vive en
[acandaldev/openspec-software-factory-template](https://github.com/acandaldev/openspec-software-factory-template).
Este repositorio solo publica el sitio: no contiene el código que se copia a los proyectos.

### Sincronía con el template

`data/template.json` es una copia fijada del manifiesto del template. `scripts/check-template-sync.mjs`
compara esa copia con el `template.json` publicado y comprueba que `TEMPLATE.md`
y las páginas de adopción apuntan a la misma versión. El workflow
`template-sync.yml` lo ejecuta en cada push y cada 6 horas. Si el template cambia su
manifiesto, el check falla hasta que el sitio se actualice.

## Construir y validar

```bash
node scripts/check-secrets.mjs   # falla si hay credenciales o datos prohibidos
node scripts/check-template-sync.mjs   # requiere red; compara con el manifiesto del template
node build.mjs                   # genera dist/
```

Genera `dist/` con `es/`, `en/`, un redirect en la raíz, `sitemap.xml`, `robots.txt` y `404.html`. No requiere instalar nada.

## Publicar

GitHub Actions construye y publica en GitHub Pages en cada push a `main`
(`.github/workflows/pages.yml`). La URL prevista:

```
https://acandaldev.github.io/openspec-software-factory/
```

## Reglas del contenido

- Datos saneados: sin dominios, IPs, rutas personales ni secretos.
- El gate `check-secrets.mjs` corre en CI antes del build; un hallazgo rompe el workflow.
- `data/forbidden.json` solo contiene ejemplos genéricos. Los términos del proyecto real
  se leen de `~/.config/openspec-software-factory/forbidden.json` (en Windows,
  `%USERPROFILE%\.config\...`) o de `OPENSPEC_FORBIDDEN_FILE`, fuera del repositorio.
- Cada página existe en ES y EN con el mismo slug.
- Los diagramas son SVG inline. Las animaciones usan GSAP + ScrollTrigger self-hosted en `site/assets/vendor/`.

## Licencia

MIT. Ver `LICENSE`.

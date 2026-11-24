# OpenSpec Software Factory

Sitio público del método: **OpenSpec + subagentes + gates + traza + curador**.

- `content/es/`, `content/en/` — fuente de las páginas en markdown.
- `content/pages.json` — tres páginas largas y los fragmentos que las componen; las URLs antiguas se generan como redirects.
- `data/metrics.json` — cifras saneadas y enlace al repo.
- `site/assets/` — CSS, favicon.
- `build.mjs` — generador estático **sin dependencias**.

## Construir y validar

```bash
node scripts/check-secrets.mjs   # falla si hay credenciales o datos prohibidos
node build.mjs                   # genera dist/
```

Genera `dist/` con `es/`, `en/` y un redirect en la raíz. No requiere instalar nada.

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
- Cifras agregadas y redondeadas; si cambian, se actualiza `data/metrics.json`.
- Cada página existe en ES y EN con el mismo slug.
- Los diagramas son SVG inline: sin CDN ni JavaScript de terceros.

## Licencia

MIT. Ver `LICENSE`.

# Pocos scripts, y cada uno con un dueño

La tentación es automatizar con scripts. El método hace lo contrario: escribe reglas en texto y deja scripts solo para lo que un texto no puede garantizar.

## La regla

> Un script nuevo solo se justifica si **elimina una decisión humana** o **impide que un documento mienta**. Si solo reorganiza, no entra. Y todo script debe tener un consumidor en CI; si no, es una herramienta personal.

## Los que sostienen el método

### `docs-sync.mjs`

Mantiene tres cosas en sincronía:

- El **índice** de documentación, desde el frontmatter.
- Las **cifras de avance** de la memoria, contando tareas.
- El **archivo de trazas** largas, que salen de `tasks.md` y van a un historial.

Tiene tres modos:

```bash
node scripts/docs-sync.mjs                 # corrige
node scripts/docs-sync.mjs --check         # valida; falla si algo no cuadra
node scripts/docs-sync.mjs --plan <cambio> # imprime el plan en JSON
```

### `check-secrets.mjs`

Recorre los ficheros de texto y falla si encuentra una credencial, una ruta de usuario o un término de la lista prohibida. Es el gate que impide que el template arrastre datos del proyecto del que salió.

Vive en el sitio y en el template. Un gate de secretos que no corre en CI no protege: conéctalo al workflow de documentación.

```bash
node scripts/check-secrets.mjs   # falla con el hallazgo y su línea
```

La lista pública (`data/forbidden.json`) solo lleva ejemplos. Los términos del proyecto concreto se leen de `~/.config/openspec-software-factory/forbidden.json` (o de `OPENSPEC_FORBIDDEN_FILE`), fuera del repositorio: el gate no publica los datos que vigila.

### `--plan`

Convierte las tareas en algo que una máquina puede consultar:

```json
{ "id": "1.2", "bloque": 1, "nivel": "NORMAL", "estado": "pendiente", "deps": ["1.1"] }
```

Responde a «¿qué toca ahora?» sin interpretar prosa.

## Los que no van en el template

Las herramientas de diagnóstico personal —medir tiempos, listar tests lentos— no tienen consumidor en CI. Se quedan fuera: un script que nadie ejecuta se pudre.

## Workflows

Los workflows no son scripts: son el esqueleto del CI. Cada proyecto define los suyos; la tabla de patrones y disparadores vive en [Gates → CI](index.html#ci).

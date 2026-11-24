# Template: estado, huecos y módulo wiki

Este documento es la fuente de verdad del **template ejecutable**, no del sitio
público. El sitio cuenta el método; el template lo instala.

## 1. Qué existe hoy

El `template/` ejecutable **todavía no existe**. Lo que hay:

| Pieza | Dónde vive | Estado |
|---|---|---|
| Sitio público y método | `content/`, `build.mjs` | Hecho |
| Implementación de referencia | repositorio del proyecto real | Funcionando |
| Contrato global y reglas | `AGENTS.md` de referencia | Listo para extraer |
| Agentes | `.opencode/agents/` de referencia | 3 subagentes |
| Comandos propios | `.opencode/commands/` | 5 propios + `opsx-*` de OpenSpec |
| `docs-sync` + tests | `scripts/` de referencia | Implementado |
| Gate de secretos | este repositorio | Implementado |
| Workflows | referencia | Específicos del proyecto |
| Wiki | solo documentación | No implementada |
| Bootstrap y tests del template | — | **No existen** |

La extracción está deliberadamente aplazada: el propio registro de decisiones
de la referencia dice que no se cristaliza la plantilla antes de cerrar el MVP.
La v1 será **OpenCode-only**.

## 2. Roles: coordinador, curador y revisores

### Coordinador

**No hay un agente `coordinator` y no debería haberlo como subagente.** El
coordinador es la **sesión principal**: es la única que puede hablar con el
usuario, pedir permisos y decidir paradas. Un subagente no puede aprobar una
confirmación porque no tiene usuario en su sesión.

El rol se implementa con:

- reglas de coordinación en `AGENTS.md`;
- el comando `/coordinar`;
- el brief que viaja al `implementer` y los trailers del commit.

Si se quiere un agente primario llamado `coordinator`, es posible, pero
duplica la sesión principal y añade un paso de selección. No es núcleo.

### Curador

La referencia ya tiene el comando `/curar` y el registro de `docs/harness.md`.
El curador no es un agente autónomo: lo ejecuta la sesión principal, propone
0–3 filas y el humano aprueba. Lo que falta es extraerlo al template:

- plantilla de `docs/harness.md` con la tabla de decisiones;
- comando `/curar` en `.opencode/commands/`;
- cadencia: al cerrar bloque, semanal y al cerrar cambio;
- no automatizar la decisión: el agente propone, el humano acepta.

### Revisores

La referencia tiene `implementer`, `reviewer` y `openspec-reviewer`. El sitio
solo nombra al reviewer de código. Hay que documentar los dos:

- `reviewer`: revisa implementación, tests y mutaciones en una copia congelada;
- `openspec-reviewer`: revisa coherencia entre proposal, specs, design y tasks,
  sin tocar código.

## 3. Matriz de huecos

### P0: bloquean la v1

| Hueco | Riesgo | Acción |
|---|---|---|
| No existe `template/` ni bootstrap | No hay producto instalable | Crear `core/`, `bootstrap.mjs`, `tests/` |
| Config del harness incompleta | El bootstrap no puede generar un proyecto | Schema con proyecto, stack, dirs, URLs, modelos OpenCode, CI, versiones y módulos |
| Integración de un segundo harness | Contradice “v1 OpenCode-only” | Excluirla del core; dejar adaptadores para después |
| Falta gate de secretos en la referencia | El template puede arrastrar datos del proyecto | Copiar `check-secrets.mjs` y lista externa |
| CI genérica inexistente | Los workflows actuales son del proyecto real | `docs.yml` + `gates.yml` parametrizados |
| Comandos Windows/POSIX mezclados | El template falla en Linux o en Windows | Comandos Node o `cross-env`; prohibir `$env:` y `VAR=x` mezclados |
| Sin baseline de permisos | Un agente puede ejecutar lo irreversible | `allow`/`ask`/`deny` explícitos en la config |
| Sin tests del template | No se sabe si una instalación funciona | Tests de bootstrap, config, docs-sync y secretos |

### P1: completan el método

| Hueco | Riesgo | Acción |
|---|---|---|
| Curador solo en la referencia | El template no lo instala | Extraer `/curar`, la plantilla de registro y la cadencia |
| Modelos duplicados en prosa | Deriva entre `AGENTS.md`, comandos y config | Una tabla/fuente y el comando la consulta |
| `opsx-*` y skills copiados | Se desactualizan con OpenSpec | Depender del CLI de OpenSpec; no vendorizar |
| Faltan plantillas de `docs/` | El usuario no sabe qué escribir | `docs/index`, `arquitectura`, `api`, `runbook`, `evals`, `harness`, `fuera-de-mvp` |
| Falta plantilla de `MEMORY.md` | Estado inventado | Seis secciones y techo de líneas |
| Wiki solo documentada | Promesa sin implementación | Módulo opcional (ver §5) |
| Sin validación de configuración | Un campo mal puesto falla tarde | `bootstrap --check` y schema |

### Copy del sitio: estado

- **Alineado en el sitio**: el coordinador es la sesión principal, el reviewer
  de specs está documentado, LLM Wiki es una capa opcional, el template v1 se
  presenta como no publicado, la mutación se explica fuera del CI y el estado
  usa el límite real de 85 líneas.
- **Pendiente en el template**: extraer `/curar` y la plantilla de registro (el
  comando ya existe en la referencia); incorporar `check-secrets`; unificar la
  configuración (URLs, CI, versiones y modelos OpenCode) para que “todo vive en
  un solo fichero” sea cierto, no un objetivo.

### P2: hardening

- Comprobar enlaces y anchors del sitio en CI.
- Comprobar que el copy del sitio sigue el estado del template.
- Plantilla de PR y checklist de merge.
- Protección de `main` y revisión obligatoria.
- Fijar versiones de Node, OpenSpec y acciones.
- `CHANGELOG`, `LICENSE` MIT y README de instalación.
- Job opcional de Windows además de Linux.

### Fuera de la v1

- Segundo harness y adaptadores.
- Herramientas de diagnóstico personal.
- Documentos, evidencias y dominios del proyecto real.
- `codegraph` y `roslyn-codelens`: binarios locales opcionales, no requisitos.
- Wiki 3D o grafo interactivo: primero texto y lint determinista.

## 4. Layout objetivo

```text
template/
  core/
    AGENTS.md
    .opencode/
      agents/
      commands/
    scripts/
      docs-sync.mjs
      docs-sync.test.mjs
      check-secrets.mjs
    .github/workflows/
      docs.yml
      gates.yml
    harness.config.example.json
    opencode.jsonc
  bootstrap.mjs
  tests/
  modules/
    wiki/
  LICENSE
  README.md
```

El bootstrap pregunta los campos, copia `core/`, genera la configuración,
instala o valida OpenSpec y ejecuta `--check`. No escribe nada antes de que el
usuario acepte el plan.

## 5. Módulo `wiki` (LLM Wiki de Karpathy)

### Qué es

Un patrón de conocimiento personal, no un producto:

```text
raw/       fuentes inmutables: PDFs, notas, artículos, capturas
wiki/      páginas compiladas por el LLM: conceptos, entidades, comparativas
index.md   mapa que el agente lee primero
log.md     historial append-only
```

La idea es **compilar una vez**, no re-derivar en cada consulta. Sin base
vectorial: el agente lee el índice y abre solo lo relevante.

### Dónde encaja

| Capa | Qué guarda | ¿Núcleo? |
|---|---|---|
| `openspec/` | Qué debe ser verdad | Sí |
| `docs/` + `MEMORY.md` | Operación y estado | Sí |
| `wiki/` | Conocimiento externo acumulado | **No: módulo opcional** |

No sustituye a `docs/` ni a `MEMORY.md`. Si el proyecto ya tiene documentación
operativa madura, la wiki empieza como carpeta de investigación, no como segunda
documentación. En un producto con docs estables se queda apagada.

### Layout del módulo

```text
modules/wiki/
  raw/.gitkeep
  wiki/index.md
  wiki/log.md
  wiki/AGENTS.wiki.md
  scripts/wiki-lint.mjs
```

### Configuración

```json
{
  "wiki": {
    "enabled": false,
    "root": "wiki",
    "raw": "wiki/raw",
    "index": "wiki/index.md",
    "maxIndexLines": 120
  }
}
```

### Bootstrap

1. Pregunta si el proyecto acumula investigación externa.
2. Si la respuesta es no, no copia nada.
3. Si es sí, copia el módulo, añade el bloque a `AGENTS.md` y activa el lint en CI.
4. `--check` falla si `enabled: true` y faltan `index.md`, `raw/` o el script.

### Comandos

- `/wiki-ingest <fuente>`: lee una fuente, actualiza páginas, enlaza y registra.
- `/wiki-query <pregunta>`: lee `index.md`, abre lo relevante y cita fuentes.
- `/wiki-lint`: ejecuta el lint determinista y muestra huérfanas y enlaces rotos.

### Lint determinista

- Toda página tiene frontmatter: `type`, `sources`, `updated`.
- `index.md` coincide con las páginas existentes.
- No hay páginas huérfanas.
- Los enlaces internos resuelven.
- Cada `source` existe bajo `raw/`.
- `raw/` no aparece modificado por el agente.

Las contradicciones semánticas las detecta el LLM, pero **no bloquean el merge**:
las revisa una persona. Un modelo que se equivoca no debe romper CI.

### Guardrails

- `raw/` es inmutable para el agente.
- Toda página generada cita sus fuentes.
- Una persona revisa cambios semánticos.
- Un solo escritor o una PR por vez; nada de dos agentes editando la misma wiki.
- La wiki no es el registro de decisiones: eso vive en `docs/harness.md`.

### Criterios de aceptación

1. Con `wiki.enabled: false`, el bootstrap no crea nada y el CI no ejecuta lint.
2. Con `enabled: true`, `wiki-lint --check` falla ante página sin frontmatter,
   enlace roto, huérfana o fuente inexistente.
3. El agente no modifica `raw/`; el test lo comprueba con `git diff --exit-code`.

## 6. Seguridad y multiplataforma

- Ningún secreto, token, dominio, IP ni ruta personal en el template.
- La lista de términos prohibidos vive fuera del repositorio; el repo solo lleva
  ejemplos.
- `check-secrets` corre en CI antes del build.
- Nada de `$env:` ni `VAR=x` en comandos compartidos: Node o `cross-env`.
- `.gitattributes` con `eol=lf`; los scripts se invocan con `node`, no con `./`.
- CI en Linux; job opcional de Windows para los scripts.
- Permisos: lo irreversible `deny`, lo rutinario `allow`, lo dudoso `ask`.

## 7. Orden de extracción

1. Cerrar el MVP de la referencia.
2. Crear el repo template desde la etiqueta `harness-v1`.
3. Borrar código, docs y evidencias del proyecto.
4. Extraer `core/` y sanear el contrato.
5. Escribir `bootstrap.mjs` y sus tests.
6. Añadir `check-secrets` y la CI genérica.
7. Validar con un proyecto vacío en Linux y Windows.
8. Publicar `v0.1.0`; el módulo wiki puede esperar a `v0.2.0`.

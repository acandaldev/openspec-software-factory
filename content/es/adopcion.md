# Cómo se adopta

> El template ejecutable v0.1 ya está publicado: [openspec-software-factory-template](https://github.com/acandaldev/openspec-software-factory-template). Esta página describe cómo se adopta el método.

La adopción consiste en crear el proyecto desde el template, configurarlo con unos pocos datos y verificarlo. No es una instalación de plataforma: es un repositorio con reglas y gates.

<a id="un-ejemplo-completo-acme-notes"></a>

> El recorrido completo, con dos bloques y once tareas, tiene su propia página: [Ejemplo completo](ejemplo.html). Esta página se queda con la adopción.

<svg class="diagram" viewBox="0 20 760 90" role="img" aria-label="Seis pasos para montar y estrenar el método">
  <line x1="50" y1="50" x2="710" y2="50" stroke="#22303a" stroke-width="2"/>
  <line class="draw" pathLength="1" x1="50" y1="50" x2="710" y2="50" stroke="#6ee7a8" stroke-width="2"/>

  <g class="fade" style="animation-delay:.05s">
    <circle cx="50" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">1</text>
    <text x="50" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Repo</text>
    <text x="50" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">template</text>
  </g>

  <g class="fade" style="animation-delay:.12s">
    <circle cx="182" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="182" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">2</text>
    <text x="182" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">OpenSpec</text>
    <text x="182" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">init</text>
  </g>

  <g class="fade" style="animation-delay:.19s">
    <circle cx="314" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="314" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">3</text>
    <text x="314" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Bootstrap</text>
    <text x="314" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">config</text>
  </g>

  <g class="fade" style="animation-delay:.26s">
    <circle cx="446" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="446" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">4</text>
    <text x="446" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Contrato</text>
    <text x="446" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">revisar</text>
  </g>

  <g class="fade" style="animation-delay:.33s">
    <circle cx="578" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="578" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">5</text>
    <text x="578" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Verificar</text>
    <text x="578" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">gates</text>
  </g>

  <g class="fade" style="animation-delay:.40s">
    <circle cx="710" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="710" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">6</text>
    <text x="710" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Cambio</text>
    <text x="710" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">estrenar</text>
  </g>
</svg>

<!-- TOC -->

## Ruta mínima

Montar el harness lleva 20–30 minutos. El primer cambio, otros 15.

1. **Crea el repositorio** desde el template.
2. **Inicializa OpenSpec** si el proyecto aún no lo tiene (`openspec init`).
3. **Ejecuta el bootstrap**: `node bootstrap.mjs` (interactivo o con flags).
4. **Revisa el contrato**: `AGENTS.md`, agentes y comandos sin placeholders.
5. **Verifica**: `docs-sync --check`, `check-secrets` y los tests.
6. **Estrena el método**: `/opsx-propose "<descripción>"` → `/implementar` → `/revisar`.

`/coordinar` y `/curar` llegan después; para empezar bastan esos tres comandos.

## Requisitos

Antes de empezar, revisa qué hay que instalar y qué se da por hecho. El harness funciona en Windows (Git Bash o WSL) y Linux; PowerShell no está soportado:

| Necesitas | Qué hacer | Para qué |
|---|---|---|
| **OpenCode** | Instalar | Harness de la v0.1: subagentes, permisos y comandos. |
| **OpenSpec** | Instalar | Especificaciones y tareas; ejecuta `openspec init` si el proyecto aún no lo tiene. |
| **Node.js 22+** | Instalar | Solo el harness y el CI: bootstrap, `docs-sync`, `worktree-deps`, plan y tests. El producto generado no lo necesita. |
| **Git y CI** | Tener ya | Ramas, commits y PR; GitHub Actions en la implementación de referencia. |
| **Bash** | Tener ya | Git Bash en Windows o WSL; los agentes ejecutan ahí los gates. PowerShell no está soportado. |
| **Modelos de OpenCode** | Configurar | Los seis IDs de modelo del bootstrap deben existir en tu instalación. |

## Los campos del proyecto

| Campo | Ejemplo |
|---|---|
| Nombre y slug | `acme-notes` |
| Descripción y stack | notas internas; Node + TypeScript |
| Directorios de código | `src/` |
| Comandos | build, test y formato |
| Modelos por nivel | implementar y revisar `[HARD]`, NORMAL y `[FAST]` |
| Copias de revisión | `.review` |
| Rama principal | `main` |

El bootstrap pide esos datos una sola vez y los escribe en `harness.config.json` y en el contrato. Si queda un placeholder sin resolver, falla.

## Harness y adaptadores

La v0.1 se construye y se prueba sobre **OpenCode**. No es una dependencia del método —el contrato, los gates y la traza son ficheros y git—, pero sí de las capacidades que el bucle usa: subagentes, permisos por agente y sesiones reanudables.

| Harness | Estado en la v0.1 |
|---|---|
| OpenCode | soportado |
| Claude Code | extensión prevista |
| Codex | extensión prevista |
| Gemini CLI | extensión prevista |

Un adaptador traduce la misma fuente al formato de cada asistente. No se implementa ninguno hasta validar el método: mantener dos harness antes de que el primero funcione duplica el mantenimiento. Si un asistente no tiene subagentes o permisos, el bucle se degrada a un agente único y el límite se documenta.

## Qué no copiar

- Los documentos de dominio de otro proyecto.
- Las herramientas de diagnóstico personal.
- Las credenciales, los dominios y las rutas concretas.
- La historia de decisiones: cada proyecto escribe la suya.

## Cómo saber que está bien

- Un documento nuevo sin `type` **rompe** el CI.
- Una tarea sin dependencia explícita **se ve** en el plan.
- Un commit de tarea sin brief **se detecta** en la revisión.
- Un cambio de harness sin fila en el registro **se revisa en el curador**.
- Un secreto o un dato del proyecto real **debe romper** el build.

Si nada de eso falla, el método está decorando, no controlando.

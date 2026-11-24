# Quién hace qué

El método separa cinco responsabilidades que un agente único mezcla: coordinar, implementar, revisar código, revisar especificaciones y curar el harness. Las tres primeras forman el bucle de tarea; las otras dos se ejecutan fuera de él. Cada una tiene su contexto, su modelo y sus límites.

> El **coordinador** y el **curador** son **sesión principal**, no subagentes: son los únicos que pueden pedir permisos y hablar con el usuario. Los subagentes son `implementer`, `reviewer` y `openspec-reviewer`.

<svg class="diagram" viewBox="0 0 760 330" role="img" aria-label="Secuencia: coordinador, implementer, gates y reviewer">
  <defs>
    <marker id="a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>
  <rect x="18" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="93" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Coordinador</text>
  <text x="93" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">brief · orden · gates</text>

  <rect x="208" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="283" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Implementer</text>
  <text x="283" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">código · tests · commit</text>

  <rect x="398" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="473" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Gates</text>
  <text x="473" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">build · test · formato</text>

  <rect x="588" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="663" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Reviewer</text>
  <text x="663" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">evidencia · veredicto</text>

  <line class="draw" pathLength="1" x1="170" y1="65" x2="204" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a2)"/>
  <line class="draw" pathLength="1" x1="360" y1="65" x2="394" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a2)"/>
  <line class="draw" pathLength="1" x1="550" y1="65" x2="584" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a2)"/>

  <path d="M 663 104 C 663 160, 283 160, 283 104" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a2)"/>
  <text x="473" y="180" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="12">si hay cambios, el delta vuelve al mismo implementer</text>

  <rect x="18" y="220" width="720" height="80" rx="12" fill="#10161c" stroke="#22303a"/>
  <text x="40" y="250" fill="#93a4b3" font-family="system-ui" font-size="12">Regla</text>
  <text x="40" y="272" fill="#e6edf3" font-family="system-ui" font-size="13">el coordinador no implementa ni revisa; el reviewer no escribe código de producción</text>
  <path id="task-flow" d="M 93 105 L 283 105 L 473 105 L 663 105 C 663 160, 283 160, 283 104" fill="none" stroke="none" aria-hidden="true"/>
  <circle id="task-dot" r="4" fill="#6ee7a8" opacity="0" aria-hidden="true"/>
</svg>

> El reviewer de specs y el curador no aparecen en el flujo de tarea: el primero se usa antes de codificar, al cerrar un cambio o cuando cambia una especificación; el segundo, al cerrar un bloque o cambio; `--semana` es opcional.

## Coordinador

Lee el plan, elige la tarea lista y **transcribe** el brief cerrado desde `tasks.md`: cambio, tareas, bloque, nivel, modelo, criterio de aceptación y ficheros esperados. No decide el nivel ni el bloque. Lanza al implementer, verifica los gates y, al cerrar el bloque, empuja la rama y espera el CI. No toca el código.

## Implementer

Trabaja en el worktree del bloque. Implementa, escribe el test, ejecuta los gates, aplica las mutaciones que fija el nivel y las revierte, y commitea cuando todo está en verde. Marca la tarea y deja la traza con agente, coste y resultado. No empuja. No decide el nivel, el bloque ni el plan.

## Reviewer

Revisa el rango de commits, no el árbol sin commitear. Lee los requisitos, comprueba la evidencia, ejecuta las mutaciones en una copia congelada y emite un veredicto. No escribe código de producción.

## Reviewer de specs

Revisa la coherencia entre proposal, specs, design y tasks. No toca código ni tests: su salida es un veredicto sobre el contrato. Se usa antes de codificar, al cerrar un cambio o cuando una especificación cambia.

## Los tres momentos

| Momento | Comando | Pregunta | Salida |
|---|---|---|---|
| Antes de codificar, cambio de spec o cierre | `/openspec-review` | ¿El contrato es coherente? | Veredicto sobre proposal, specs, design y tasks |
| Tarea o bloque | `/revisar` | ¿La implementación cumple el contrato? | Veredicto y hallazgos sobre código y tests |
| Cierre de bloque o cambio; `--semana` opcional | `/curar` | ¿Qué regla del harness debe cambiar? | 0–3 propuestas para `docs/harness.md` |

## Curador

No es un subagente: lo ejecuta la sesión principal con `/curar`. Convierte la traza de un bloque o cambio, o de los últimos 7 días con `--semana`, en 0–3 propuestas para `docs/harness.md`. No revisa código, no cambia reglas sin aprobación y no se ejecuta por tarea. Cadencia: al cerrar un bloque o cambio; `--semana` es opcional.

## Quién asigna el nivel y el bloque

El **bloque** es el encabezado `## N.` de `tasks.md`; el **nivel** es la etiqueta de cada tarea. Ambos se escriben al planificar, normalmente con `/opsx-propose` y revisión humana, no al coordinar.

El coordinador lee el bloque que se le pide y copia el nivel de la tarea en el brief; no los inventa. Si falta la etiqueta, la tarea se trata como `NORMAL`. Si una tarea es demasiado grande, se parte antes de empezar y lo aprueba el usuario. Un bloque es una fase entregable: su rama y su PR.

## Modelos por nivel

El nivel de la tarea decide el modelo y el tamaño del lote. No se mezclan niveles: el modelo lo fija el más alto. La tabla canónica —cuándo aplica, ejecución, revisión y modelo— vive en [Nivel y revisión](#nivel-y-revision).

## Permisos

Un subagente no puede aprobar una confirmación: no hay usuario en su sesión. Por eso se define por adelantado qué puede ejecutar y qué no. Lo irreversible se deniega; lo rutinario se permite; lo dudoso se pregunta al humano en el coordinador.

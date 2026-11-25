# Cuatro bucles, una sola dirección

El método se entiende por sus bucles. Cada uno tiene una cadencia, un artefacto y una puerta. Lo que cambia entre ellos no es la herramienta: es el nivel de decisión.

<svg class="diagram" viewBox="0 0 760 380" role="img" aria-label="Bucles anidados: proyecto, cambio, bloque y tarea">
  <rect x="10" y="10" width="740" height="360" rx="18" fill="#10161c" stroke="#22303a"/>
  <text x="34" y="38" fill="#93a4b3" font-family="system-ui" font-size="13">PROYECTO · meses</text>
  <text x="720" y="38" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">estado · decisiones</text>

  <rect x="34" y="54" width="692" height="292" rx="14" fill="#0f151b" stroke="#22303a"/>
  <text x="56" y="80" fill="#93a4b3" font-family="system-ui" font-size="13">CAMBIO · semanas</text>
  <text x="704" y="80" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">specs · diseño · tareas</text>

  <rect x="58" y="96" width="644" height="224" rx="12" fill="#0d1319" stroke="#22303a"/>
  <text x="80" y="122" fill="#93a4b3" font-family="system-ui" font-size="13">BLOQUE · días</text>
  <text x="680" y="122" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">rama · PR</text>

  <rect x="82" y="138" width="596" height="156" rx="10" fill="#0a0e12" stroke="#22303a"/>
  <text x="104" y="166" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">TAREA · horas</text>
  <text x="104" y="192" fill="#93a4b3" font-family="system-ui" font-size="12">brief → implementar → gates → commit → revisar</text>
  <text x="104" y="214" fill="#93a4b3" font-family="system-ui" font-size="12">evidencia: build · tests · mutación · formato</text>
  <text x="104" y="236" fill="#f0b429" font-family="system-ui" font-size="12">una ejecución = un commit</text>

  <text x="380" y="330" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">cada nivel contiene al siguiente y no se salta ninguna puerta</text>
</svg>

## Proyecto

Vive en el estado y en el registro de decisiones. No se actualiza en cada tarea: se actualiza cuando cambia el entorno, una decisión operativa o un pendiente. Su pregunta es «¿dónde estamos y qué viene después?».

## Cambio

Es una unidad de producto con especificación propia: propuesta, requisitos, diseño y tareas. Vive en el repositorio y se archiva cuando está cerrado. Su pregunta es «¿qué debe ser verdad y cómo lo demostramos?».

## Bloque

Es una fase entregable. Una rama, un worktree, varias tareas y una PR. Su pregunta es «¿qué se puede integrar junto sin romper nada?». El merge del bloque integra en `main`; el despliegue es del carril, no de cada bloque.

## Tarea

Es la unidad de trabajo del agente. Su pregunta es «¿qué hago ahora y cómo sé que está bien?». Se implementa en el worktree del bloque, se revisa por rango de commits y deja traza.

## Nivel y revisión

La etiqueta de la tarea decide el modelo y el tamaño del lote. No es una preferencia: es una política.

| Nivel | Cuándo | Ejecución | Revisión | Modelo de revisión |
|---|---|---|---|---|
| `[HARD]` | datos, concurrencia, dinero o algo difícil de revertir | 1 a 1 | por tarea | el más capaz disponible |
| NORMAL | funcionalidad normal, sin riesgo especial | lotes de 1–3 | por bloque | modelo intermedio |
| `[FAST]` | pequeño, repetitivo o visual | lotes de 3–5 | por bloque | modelo económico |

`[HARD]` no autoriza tareas grandes: cambia la revisión y el modelo, no el tamaño. Una tarea se parte antes de empezar si cumple dos o más de: toca más de 3 ficheros de producción, mezcla dos flujos independientes, cruza más de un sistema externo o tiene más de 5 escenarios verificables por separado.

## Dónde para el bucle

La autonomía no es «no preguntar nunca». Es saber exactamente cuándo parar:

- Una tarea de máxima criticidad, después de su revisión.
- Una tercera ronda de cambios sobre la misma tarea (el tope es tres).
- Un permiso que necesita al humano.
- Un hallazgo que no está en el plan.
- Un fichero en colisión con otro carril.
- Un CI rojo que el reintento no arregla.
- El fin del bloque: la PR.
- El cierre del carril: el deploy y su verificación.
- El umbral de contexto, antes de que el modelo pierda el hilo.

Todo lo demás sigue solo. Y cada parada deja motivo, para que el curador pueda corregir la causa.

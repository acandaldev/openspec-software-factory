# Cuatro piezas, una fábrica

La tesis es sencilla: un agente no mejora por tener un modelo mejor, sino por tener un sistema alrededor que le diga qué leer, qué producir, cómo demostrarlo y qué corregir después.

<svg class="diagram" viewBox="0 90 760 220" role="img" aria-label="Ciclo: contexto, agentes, traza y curador">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>
  <rect x="18" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="98" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Contexto</text>
  <text x="98" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">specs · docs · estado</text>

  <rect x="208" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="288" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Agentes</text>
  <text x="288" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">brief · gates · commit</text>

  <rect x="398" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="478" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Traza</text>
  <text x="478" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">coste · veredicto · causa</text>

  <rect x="588" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="668" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Curador</text>
  <text x="668" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">regla · commit</text>

  <line class="draw" pathLength="1" x1="180" y1="153" x2="204" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow)"/>
  <line class="draw" pathLength="1" x1="370" y1="153" x2="394" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow)"/>
  <line class="draw" pathLength="1" x1="560" y1="153" x2="584" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow)"/>

  <path d="M 668 198 C 668 268, 98 268, 98 200" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#arrow)"/>
  <text x="383" y="288" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="12">la siguiente pasada empieza con mejores reglas</text>
</svg>

## 1. Contexto compartido

El agente no adivina el stack, las decisiones ni el estado. Lo lee:

- **Especificaciones**: qué debe ser verdad, con escenarios verificables.
- **Contrato del repositorio**: comandos, límites, convenciones y trampas.
- **Runbooks**: cómo se despliega, cómo se verifica y cómo se revierte.
- **Estado**: qué está hecho, qué está bloqueado y qué viene después.

La regla es «un hecho, un sitio». Si un dato vive en dos documentos, uno de los dos acabará mintiendo.

## 2. Agentes con gates

El trabajo se delega con un **brief cerrado**: cambio, tareas, nivel, modelo, criterio de aceptación y ficheros esperados. El subagente implementa; no decide el plan. El nivel y el bloque se escriben en `tasks.md` al planificar; el coordinador los lee, no los decide.

Antes de commitear, los gates deciden por él:

| Gate | Qué demuestra |
|---|---|
| Build | El código compila |
| Tests filtrados | Lo tocado funciona |
| Formato | No hay ruido en el diff |
| Spec | Los escenarios siguen siendo válidos |
| Mutación | El test falla cuando debe fallar |

Un rojo mutado es la única prueba de que un test prueba algo. Se revierte siempre con edición inversa y se verifica que el árbol queda limpio.

## 3. Traza

Cada tarea deja una línea con agente, coste y resultado. Cada revisión deja veredicto, modelo y causa. Y el commit guarda el brief en trailers:

```
feat(notas): 1.2 crear nota devuelve 201

Brief-Cambio: notas
Brief-Nivel: NORMAL
Brief-Modelo: opencode/<modelo-intermedio>
Brief-Aceptacion: repetir la creación con la misma idempotency-key devuelve 201 sin duplicar la nota
```

La traza no es un log: es la materia prima del curador.

## 4. Curador

Al cerrar un bloque o un cambio, el curador lee lo que pasó y reescribe el sistema. No se corrige el síntoma; se corrige la regla que lo permitió.

- Un incidente se convierte en una fila del registro: hueco, decisión, dónde vive y commit.
- Una regla que se repite en dos sitios se elimina de uno.
- Un gate que no detectó nada se revisa: o sobra o está mal calibrado.

Sin esta pieza, la fábrica se queda plana: hace el trabajo, pero no aprende.

## Principios

- **Un hecho, un sitio.** La duplicación es deuda de confianza.
- **Texto antes que código.** Una regla en markdown se revisa; un script esconde decisiones.
- **Gates deterministas.** Lo que se puede comprobar con un comando, no lo decide un modelo.
- **El humano en las puertas.** Alcance, permisos, merge y producción.
- **La evidencia manda.** Sin build, test o captura, no está hecho.

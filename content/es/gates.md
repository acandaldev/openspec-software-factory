# La evidencia decide, no el agente

Un agente puede decir «está hecho». Los gates deciden si es verdad. La regla es simple: **sin evidencia, no hay commit**.

<svg class="diagram" viewBox="0 0 760 280" role="img" aria-label="Pipeline de gates: build, tests, formato, spec y mutación">
  <defs>
    <marker id="g1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <text x="10" y="20" fill="#93a4b3" font-family="system-ui" font-size="12">GATES DE TAREA</text>
  <circle class="gate-state" cx="670" cy="28" r="5" fill="#6ee7a8"/>
  <text x="670" y="16" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">test</text>

  <rect x="10" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="70" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Build</text>
  <text x="70" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">compila</text>

  <rect x="160" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="220" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Tests</text>
  <text x="220" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">lo tocado funciona</text>

  <rect x="310" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="370" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Formato</text>
  <text x="370" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">sin ruido</text>

  <rect x="460" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="520" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Spec</text>
  <text x="520" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">escenarios válidos</text>

  <rect x="610" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="670" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Mutación</text>
  <text x="670" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">el test falla</text>

  <line class="draw" pathLength="1" x1="130" y1="64" x2="156" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>
  <line class="draw" pathLength="1" x1="280" y1="64" x2="306" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>
  <line class="draw" pathLength="1" x1="430" y1="64" x2="456" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>
  <line class="draw" pathLength="1" x1="580" y1="64" x2="606" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>

  <rect x="10" y="126" width="740" height="126" rx="12" fill="#10161c" stroke="#22303a" stroke-dasharray="5 5"/>
  <text x="30" y="154" fill="#f0b429" font-family="system-ui" font-size="12">La mutación demuestra que el test prueba algo</text>

  <rect x="40" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="115" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">aplicar</text>
  <text x="115" y="208" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">cambia producción</text>

  <rect x="220" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="295" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">test rojo</text>
  <text x="295" y="208" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="10">debe fallar</text>

  <rect x="400" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="475" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">revertir</text>
  <text x="475" y="208" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">edición inversa</text>

  <rect x="580" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="655" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">test verde</text>
  <text x="655" y="208" text-anchor="middle" fill="#6ee7a8" font-family="system-ui" font-size="10">árbol limpio</text>

  <line class="draw" pathLength="1" x1="190" y1="196" x2="216" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>
  <line class="draw" pathLength="1" x1="370" y1="196" x2="396" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>
  <line class="draw" pathLength="1" x1="550" y1="196" x2="576" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1)"/>

  <text x="380" y="244" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">si sigue verde, el test no estaba probando nada</text>
</svg>

## Los cinco gates

| Gate | Comando | Qué demuestra |
|---|---|---|
| Build | compilar el proyecto | El código es coherente |
| Tests | filtrar las clases tocadas | Lo que cambió funciona |
| Formato | verificar sin escribir | No hay ruido en el diff |
| Spec | validar el cambio | Los escenarios siguen siendo válidos |
| Mutación | romper el test a propósito | El test prueba algo |

## La mutación

Un test que pasa siempre no demuestra nada. La mutación cambia el código de producción, ejecuta el test y exige que falle. Después se revierte **con la edición inversa**, nunca con `git checkout`, y se verifica que el árbol queda limpio.

```
1. aplicar mutación
2. ejecutar el filtro  → debe fallar
3. revertir con edición inversa
4. git status --short  → vacío
5. pasada verde final
```

Un commit no puede contener marcadores de mutación ni apoyarse en un verde anterior a la reversión.

## Gates de tarea y de bloque

- **Durante la tarea** se ejecuta el filtro de las clases tocadas. La suite completa es demasiado lenta para cada paso.
- **Al cerrar el bloque** se ejecuta la suite completa, antes de la PR.
- **El reviewer** repite los gates que apliquen al lado tocado y añade las mutaciones en una copia congelada.

## CI

El CI no sustituye a los gates locales: los confirma en un entorno limpio. Un run rojo que nadie mira es un verde falso; por eso cada push del bloque o de la PR espera su resultado antes de seguir.

El gate de mutación es local: se ejecuta durante la tarea y en la revisión, sobre una copia congelada. Un barrido de mutación en CI, si existe, es informativo: observa, no aprueba.

La tabla describe patrones de la implementación de referencia, no un contrato: cada proyecto define sus workflows y sus rutas. El núcleo del template es el workflow de documentación y el gate de secretos; los gates de PR y despliegue se añaden en cada proyecto.

| Workflow | Cuándo |
|---|---|
| Backend / Front | PR que toca ese lado |
| Docs | cambios en documentación y harness |
| Pre-deploy | push a `main`: gates, despliegue de pre y smoke |
| Producción | manual, con confirmación explícita |

El gate de secretos va siempre en CI: uno que no corre no protege.

## Las paradas

Los gates no deciden todo. El bucle para cuando:

- Un gate no puede ejecutarse por permisos del entorno.
- El test no cubre lo que dice la tarea.
- La mutación no produce rojo.
- El CI falla por una causa que el reintento no arregla.

Cada parada deja el motivo. Sin motivo, no hay forma de corregir la causa.

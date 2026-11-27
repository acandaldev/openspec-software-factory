# Preguntas frecuentes

Si no sabes qué comando toca, ejecuta `/estado`. Lee el plan, git, la PR y el CI, y te devuelve una línea por cambio con el siguiente comando o carril recomendado.

## ¿Qué comando uso?

| Si quieres… | Comando | Quién lo ejecuta |
|---|---|---|
| Crear el cambio y sus artefactos | `/opsx-propose` | sesión principal |
| Saber qué toca ahora | `/estado` | sesión principal |
| Revisar el contrato antes de codificar | `/openspec-review` | `openspec-reviewer` |
| Implementar una tarea o un lote | `/implementar` | `implementer` |
| Revisar código y tests | `/revisar` | `reviewer` |
| Encadenar las tareas listas de un bloque | `/coordinar` | sesión principal |
| Mejorar el harness con la traza | `/curar` | sesión principal |
| Cerrar el cambio | `/opsx-verify` → `/opsx-sync` → `/opsx-archive` | sesión principal |

Los comandos no compiten: cada uno tiene un ámbito distinto.

| Ámbito | Comandos | Qué deciden |
|---|---|---|
| Cambio | `/opsx-propose`, `/openspec-review` | qué se construye y si el contrato es coherente |
| Bloque | `/coordinar` | en qué orden se ejecutan las tareas listas |
| Tarea | `/implementar` | cómo se implementa |
| Gate | `/revisar` | si la evidencia cumple; no es opcional |
| Cierre | `/curar`, `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | qué regla cambia y cuándo se archiva |

## `/estado`: el observador

`/estado` no implementa, no revisa, no cura y no commitea. Solo lee el plan, el árbol, la PR y el CI, y resume.

```text
Estado · 2026-11-27 10:12 · 2 cambios activos

acme-notes     11/11  bloque 2  sin carril  sin PR  —          → /curar y cerrar
acme-billing    3/7   bloque 1  feat/…-1    PR #12   CI verde   → /revisar bloque 1

Siguiente carril recomendado: feat/acme-notes-2
Comando: /curar acme-notes 2
```

Si un dato no se puede confirmar, lo marca como `no verificado`. La recomendación es una sola y no se ejecuta sola: el comando observa, tú decides.

## ¿`/coordinar` es siempre el primero?

No. Es el primero **de un bloque ya planificado**. Antes van `/opsx-propose` y `/openspec-review`.

`/coordinar` no es el coordinador del proyecto entero: ejecuta las tareas listas de un bloque, en el orden del plan, y para en las paradas: una tarea `[HARD]` recién revisada, la tercera ronda de `CAMBIOS NECESARIOS`, un permiso, una colisión, un CI rojo o el fin del bloque.

## ¿`/coordinar` decide si toca implementar, revisar o curar?

No. La decisión no es suya:

- **Implementar** lo decide el plan: la tarea está pendiente y sus dependencias están hechas.
- **Revisar** lo decide el nivel: `[HARD]` por tarea; NORMAL y `[FAST]` por bloque. No es opcional.
- **Curar** es del cierre del bloque o del cambio, no del bucle de tarea, y propone sin cambiar reglas.

Si un coordinador pudiera decidir si revisar, podría saltarse el gate. Por eso `/estado` recomienda y `/coordinar` ejecuta, pero ninguno sustituye al plan ni al nivel.

## Las tres confusiones típicas

### `/implementar` vs `/coordinar`

`/implementar` hace una tarea o un lote concreto. `/coordinar` encadena las tareas listas de un bloque y para en las paradas. Para una tarea `[HARD]`, lo normal es `/implementar` y `/revisar`; `/coordinar` puede empezar por ella, pero parará después de su revisión.

### `/revisar` vs `/openspec-review`

`/revisar` mira código y tests después de implementar. `/openspec-review` mira proposal, specs, design y tasks antes de codificar o al cerrar el cambio. Uno comprueba la evidencia; el otro, el contrato.

### `/curar` vs `/revisar`

`/curar` no revisa código: lee la traza y propone 0–3 filas para `docs/harness.md`. No cambia una regla sin aprobación. `/revisar` emite un veredicto sobre el alcance implementado.

## ¿Qué hago si `/revisar` devuelve `CAMBIOS NECESARIOS`?

Se reabre la tarea, se corrige con el mismo `implementer` y se revisa el delta. El brief no se ablanda y el tope es de tres rondas; si la tercera sigue en rojo, se para y decide el usuario.

## ¿Dónde queda la evidencia?

En la matriz **escenario → evidencia** del informe, en la sección `## Revisiones` de `tasks.md` y en los trailers del commit. Un test que solo comprueba el encolado no cubre un escenario de entrega.

## ¿Qué es un bloque y un nivel?

El **bloque** es el encabezado `## N.` de `tasks.md`; el **nivel** es la etiqueta de cada tarea (`[HARD]`, NORMAL o `[FAST]`). Ambos se escriben al planificar, no al coordinar. El nivel decide el modelo y la cadencia de revisión. [Ver el método](metodo.html#nivel-y-revision).

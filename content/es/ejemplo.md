# Ejemplo completo: acme-notes, de la idea al cambio archivado

> Este recorrido asume que ya creaste el repositorio desde el template y ejecutaste `node bootstrap.mjs`. Si todavía no lo has hecho, empieza por [Cómo se adopta](adopcion.html).

`acme-notes` es una aplicación pequeña de notas: una API, una interfaz y un equipo de dos personas. No es un caso real; es un proyecto imaginario para ver la secuencia completa sin ruido de dominio.

> Los comandos de este recorrido son los del adaptador OpenCode de la v0.1. El método —spec, gates y traza— es el mismo con otro harness.

El cambio se llama `notas`. Tiene **dos bloques** y **once tareas**. Un bloque es una fase que se puede integrar sola; una tarea es un trozo pequeño con su propio commit. El ejemplo enseña cuándo se llama a cada comando y qué deja cada paso antes de pasar al siguiente; el deploy se decide al cerrar el carril.

## Las piezas que vas a ver

| Pieza | Qué es | En este ejemplo |
|---|---|---|
| **Cambio** | El trabajo completo, con su propuesta, specs, diseño y tareas. | `notas` |
| **Bloque** | Una fase entregable. Termina en una rama y una PR. | 1 y 2 |
| **Tarea** | Un paso observable dentro del bloque. | `1.1`, `1.2`… |
| **Nivel** | La dificultad y el riesgo de la tarea. | `[HARD]`, `NORMAL`, `[FAST]` |
| **Worktree** | Una copia de trabajo aparte para no mezclar el bloque con `main`. | `paralelo/notas-1` |
| **Brief** | La instrucción cerrada que el coordinador pasa al implementer. | Cambio, tarea, nivel, modelo y criterio |
| **Gates** | Las comprobaciones que deben pasar antes de commitear. | Build, tests, formato y spec |
| **Mutación** | Romper el código a propósito para comprobar que el test falla. | Dos por tarea en `[HARD]`; una por bloque en el resto |

## El plan se escribe antes de programar

Todo empieza con una petición, no con código. Escribes lo que quieres con `/opsx-propose "una app de notas con etiquetas, búsqueda y archivo"`; OpenSpec deriva el nombre `notas` y crea la propuesta, la spec, el diseño y las tareas. Después, una persona revisa el resultado y ajusta los bloques y los niveles.

El `tasks.md` del ejemplo queda así:

```md
## 1. Crear y listar notas

- [ ] 1.1 [HARD] Modelo, migración y repositorio de notas
- [ ] 1.2 NORMAL POST /notes con validación
- [ ] 1.3 NORMAL GET /notes y listado
- [ ] 1.4 [FAST] Formulario para crear una nota
- [ ] 1.5 [FAST] Lista de notas en la interfaz
- [ ] 1.6 [FAST] Estado vacío y mensajes de error

## 2. Editar y archivar

- [ ] 2.1 [HARD] Editar una nota sin perder cambios
- [ ] 2.2 NORMAL Archivar una nota
- [ ] 2.3 [FAST] Filtro de activas y archivadas
- [ ] 2.4 [FAST] Editar una nota desde la interfaz
- [ ] 2.5 [FAST] Archivar desde la interfaz
```

### Cómo se leen los niveles

Los niveles deciden el modelo, el tamaño del lote y cuándo se revisa; la tabla canónica está en [Nivel y revisión](metodo.html#nivel-y-revision). En este ejemplo, `1.1` y `2.1` son `[HARD]`; `1.2`, `1.3` y `2.2` son `NORMAL`; el resto son `[FAST]`.

Los bloques y los niveles **los escribe la planificación**, normalmente con `/opsx-propose` y revisión humana. El coordinador no los inventa: lee el bloque que se le pide y copia el nivel de la tarea. Si una etiqueta falta, la tarea se trata como `NORMAL`.

## La cronología completa

Esta es la secuencia de comandos del ejemplo, de principio a fin:

| # | Momento | Comando | Qué ocurre |
|---|---|---|---|
| 1 | Planificar | `/opsx-propose "una app de notas con etiquetas, búsqueda y archivo"` | Nacen proposal, spec, design y `tasks.md`; el cambio se llama `notas`. |
| 2 | Revisar el contrato | `/openspec-review notas` | Se comprueba que las piezas del plan cuentan lo mismo. |
| 3 | Bloque 1, tarea `[HARD]` | `/implementar notas 1.1` | Se implementa y se commitea la primera tarea. |
| 4 | Revisar `1.1` | `/revisar notas 1.1` | Un revisor independiente da el veredicto de esa tarea. |
| 5 | Resto del bloque 1 | `/coordinar notas 1` | Se ejecutan `1.2` a `1.6`, con la revisión del bloque, y se para antes de la PR. |
| 6 | Cerrar el bloque 1 | Abrir la PR y mergear | CI verde y merge; el deploy espera al cierre del carril. |
| 7 | Curar el bloque 1 | `/curar notas 1` | Se propone mejorar el harness con la traza del bloque. |
| 8 | Bloque 2, tarea `[HARD]` | `/implementar notas 2.1` | Se implementa la edición sin perder cambios. |
| 9 | Revisar `2.1` | `/revisar notas 2.1` | Veredicto de la tarea de datos. |
| 10 | Resto del bloque 2 | `/coordinar notas 2` | Se ejecutan `2.2` a `2.5` y se para antes de la PR. |
| 11 | Cerrar el bloque 2 y el carril | Abrir la PR, mergear y lanzar el deploy del carril | CI verde, merge y un único deploy al cerrar el carril. |
| 12 | Curar el bloque 2 | `/curar notas 2` | Última tanda de mejoras del harness del cambio. |
| 13 | Cerrar el cambio | `/openspec-review`, `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | Se revisa, se verifica, se sincronizan las specs y se archiva. |

## Paso a paso

### 1. Planificar el cambio

**Comando:** `/opsx-propose "una app de notas con etiquetas, búsqueda y archivo"`

**Qué pasa:** OpenSpec deriva el nombre `notas` y crea una carpeta para el cambio con cuatro piezas: `proposal.md` (qué se quiere), `specs/notas/spec.md` (qué debe ser verdad), `design.md` (cómo se hará) y `tasks.md` (el trabajo en orden).

**Qué miras:** que `tasks.md` tenga bloques claros, tareas pequeñas y una etiqueta por tarea. Todavía no se toca el código.

**Por qué ahora:** sin `tasks.md` no hay nada que implementar ni revisar. El contrato es la entrada del resto del proceso.

### 2. Revisar el contrato antes de codificar

**Comando:** `/openspec-review notas`

**Qué pasa:** el revisor de specs lee proposal, spec, design y tasks. No mira código. Busca contradicciones: una capacidad sin spec, una tarea sin verificación o una decisión que no aparece en ninguna tarea.

**Qué miras:** un veredicto y, si hay hallazgos, una lista con fichero y línea. Si el plan está incoherente, se corrige antes de implementar.

**Por qué ahora:** cambiar el plan es barato; cambiar código construido sobre un plan equivocado, no.

### 3. Implementar la tarea `[HARD]` del bloque 1

**Comando:** `/implementar notas 1.1`

**Qué pasa:** el coordinador crea el worktree del bloque (`paralelo/notas-1`) y la rama (`feat/notas-1`). Después escribe el brief de `1.1` y lanza al `implementer` con el modelo de `[HARD]`. El implementer escribe el modelo, la migración y el repositorio, añade tests, ejecuta los gates, rompe el código a propósito para comprobar que el test falla y lo revierte. Al final commitea.

**Qué miras:** la tarea `1.1` marcada `[x]`, un commit `feat(notas): 1.1 — …`, la traza con agente, coste y resultado, y el árbol limpio.

**Por qué ahora:** `1.1` es `[HARD]`: toca datos. Se hace sola y se revisa sola para no arrastrar un error de base a las tareas siguientes.

### 4. Revisar `1.1`

**Comando:** `/revisar notas 1.1`

**Qué pasa:** el `reviewer` revisa el rango de commits de la rama, no el árbol sin commitear. Lee los requisitos, ejecuta los gates y la mutación del bloque —o verifica las de `[HARD]`— en una copia congelada y emite un veredicto.

**Qué miras:** `VEREDICTO: APROBADO` o `VEREDICTO: CAMBIOS NECESARIOS`. Si hay cambios, el delta vuelve al mismo implementer, se corrige la tarea y se revisa otra vez. El máximo son tres rondas.

**Por qué ahora:** `[HARD]` se revisa por tarea. Es mejor descubrir un fallo en `1.1` que en la PR del bloque.

### 5. Terminar el bloque 1

**Comando:** `/coordinar notas 1`

**Qué pasa:** el coordinador lee el plan, ve que `1.1` ya está hecha y encadena `1.2` a `1.6`. Agrupa las tareas `NORMAL` y `[FAST]`, lanza al implementer y al reviewer, y para antes de abrir la PR. Al cerrar el bloque ejecuta la suite completa y `docs-sync`.

**Qué miras:** `1.2` a `1.6` marcadas, sus commits y la revisión del bloque. La rama `feat/notas-1` está lista para la PR.

**Por qué ahora:** es el atajo para las tareas que no son `[HARD]`. Si lanzas `/coordinar notas 1` desde el principio, haría `1.1` y pararía después de su revisión `[HARD]`; por eso el ejemplo hace `1.1` a mano y deja el resto al coordinador.

Si prefieres controlar cada lote, puedes usar `/implementar notas 1.2-1.3`, `/implementar notas 1.4-1.6` y cerrar con `/revisar notas 1.2-1.6` (revisando también el primer lote si estrenas el carril con él). Es el mismo trabajo con más llamadas.

### 6. Abrir y mergear la PR del bloque 1

**Qué pasa:** la rama `feat/notas-1` se convierte en una PR contra `main`. El CI ejecuta la suite completa. Cuando está en verde y la revisión está registrada, se mergea con merge commit, nunca con squash: los trailers del brief se perderían.

**Qué miras:** CI verde y PR mergeada; **sin deploy todavía**. El bloque integra en `main`; el despliegue se lanza al cerrar el carril. No mezcles dos bloques en la misma PR.

### 7. Curar el bloque 1

**Comando:** `/curar notas 1`

**Qué pasa:** el curador no revisa código. Lee la traza del bloque: revisiones, causas, paradas y tareas reabiertas. Propone hasta tres filas para `docs/harness.md`, cada una con el hueco, la decisión, el destino y el commit. El humano aprueba o rechaza.

**Qué miras:** una propuesta corta. Si no hay evidencia suficiente, debe decir «no hay nada que curar». No se cambia una regla sin aprobación.

**Por qué ahora:** acabas de cerrar un bloque y la traza está fresca. Curar por tarea sería ruido; curar al final del cambio, demasiado tarde.

### 8. Implementar la tarea `[HARD]` del bloque 2

**Comandos:** `/implementar notas 2.1` y después `/revisar notas 2.1`

**Qué pasa:** se repite el patrón de `1.1`, ahora en el worktree `paralelo/notas-2` y la rama `feat/notas-2`. `2.1` edita una nota sin perder cambios: es `[HARD]` porque un error puede pisar datos.

**Qué miras:** el mismo tipo de evidencia: tarea marcada, commit, tests, mutación y veredicto. Si el revisor pide cambios, se corrige antes de seguir.

### 9. Terminar el bloque 2

**Comando:** `/coordinar notas 2`

**Qué pasa:** encadena `2.2` a `2.5`, agrupa las tareas `NORMAL` y `[FAST]`, revisa el bloque y para antes de la PR. Después se abre la PR, se espera el CI y se mergea. Al cerrar el carril, se lanza **un único deploy** de los dos bloques y se verifica el commit servido.

**Qué miras:** las cinco tareas del bloque cerradas, la suite completa en verde, la PR mergeada y el deploy del carril en verde.

### 10. Curar el bloque 2 y cerrar el cambio

**Comando:** `/curar notas 2`

Después, con el cambio ya implementado, mergeado y desplegado en pre:

```text
/openspec-review notas
/opsx-verify notas
/opsx-sync notas
/opsx-archive notas
```

**Qué pasa:** `/openspec-review` comprueba que las specs, el diseño y las tareas siguen contando lo mismo. `/opsx-verify` verifica que lo implementado coincide. `/opsx-sync` actualiza las specs vivas. `/opsx-archive` archiva el cambio.

**Qué miras:** el cambio en `openspec/changes/archive/`, las specs actualizadas y la documentación sincronizada. Si la traza dejó algo importante, `/curar notas` puede proponer una última tanda antes de archivar.

## El fallo que enseña más que el camino feliz

Durante el bloque 1, el reviewer descubre que `1.2` devuelve `200` cuando la validación falla. El camino no es crear una tarea nueva ni arreglarlo a escondidas:

1. El veredicto es `CAMBIOS NECESARIOS` y la causa queda registrada como `test`: el test no cubría el código de estado.
2. Se reabre `1.2` (`[ ]`), se corrige el endpoint y el test, y se vuelve a marcar.
3. La revisión del arreglo se registra como `1.2 (delta)`. No se añaden requisitos nuevos; se comprueba lo mismo, mejor.
4. En `/curar notas 1`, la pregunta es: «¿qué regla permitió que el brief no fijara el código de estado?».

La respuesta puede ser una fila:

| Fecha | Origen | Hueco | Decisión | Dónde | Commit |
|---|---|---|---|---|---|
| 24-nov | Incidente | El brief no fijaba el código de estado de validación | Añadir el contrato HTTP al criterio de aceptación | `implementar` | `pendiente` |

Eso es curar: no parchear el síntoma, cerrar el hueco que lo hizo posible.

## Qué no harías en este ejemplo

- **No empezar por `/implementar`** sin haber creado y leído `tasks.md`.
- **No lanzar `/coordinar notas 1` esperando que salte la parada `[HARD]`**: parará después de revisar `1.1`.
- **No ejecutar `/curar` por cada tarea**: se ejecuta al cerrar bloque o cambio; `--semana` es un barrido opcional.
- **No mergear con el CI en rojo** ni con la revisión pendiente.
- **No arreglar un hallazgo debilitando el test** o cambiando la regla para que el veredicto pase.
- **No mezclar dos bloques en la misma PR**: cada bloque tiene su rama; el despliegue es una ventana de carril.

## Glosario mínimo

| Término | Qué significa |
|---|---|
| **Cambio** | El trabajo completo que empieza en una propuesta y termina archivado. |
| **Bloque** | Una fase entregable del cambio. Se integra sola y termina en una PR; el deploy es del carril. |
| **Tarea** | Un paso pequeño y observable dentro de un bloque. |
| **Nivel** | `[HARD]`, `NORMAL` o `[FAST]`; decide modelo, tamaño del lote y cadencia de revisión. |
| **Brief** | La instrucción cerrada que recibe el implementer. |
| **Worktree** | Una copia de trabajo separada para el bloque, sin tocar `main`. |
| **Gate** | Una comprobación obligatoria: build, tests, formato o spec. |
| **Mutación** | Romper el código a propósito para verificar que el test detecta el fallo. |
| **Veredicto** | La decisión del reviewer: `APROBADO` o `CAMBIOS NECESARIOS`. |
| **Delta** | La corrección de una tarea después de un veredicto con hallazgos. |
| **Traza** | El registro de qué se hizo, con qué agente, coste y resultado. |
| **Curador** | El rol que convierte la traza en propuestas para mejorar el harness. |

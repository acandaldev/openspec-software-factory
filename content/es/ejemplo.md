# Un ejemplo completo: acme-notes

`acme-notes` es una aplicación pequeña de notas: un backend, una UI y dos personas. No es un caso real; es un proyecto imaginario para ver la secuencia completa sin ruido de dominio.

## El contrato

El cambio se llama `notas`. La propuesta define una capacidad: crear y listar notas. El bloque 1 es la primera entrega desplegable. `tasks.md` queda así:

```text
## 1. API y lista

- [ ] 1.1 [HARD] Modelo, migración y repositorio de notas
- [ ] 1.2 [FAST] POST /notes con validación
- [ ] 1.3 [FAST] GET /notes y lista en la UI
```

`1.1` es `[HARD]`: toca datos y se revisa 1 a 1. `1.2` y `1.3` son `[FAST]`: pueden ir en lote y se revisan al cerrar el bloque.

## La secuencia

1. **Planificar** — `/opsx-propose notas`. OpenSpec crea proposal, spec, design y tasks. No se toca código. Evidencia: `openspec/changes/notas/`.
2. **Primera tarea** — `/implementar notas 1.1`. La sesión principal escribe el brief y lanza `implementer` con el modelo de `[HARD]`; implementa, prueba, muta y commitea en `paralelo/notas-1`. Evidencia: commit con `Brief-*`, build, tests y 2 mutaciones rojas.
3. **Revisar** — `/revisar notas 1.1`. `reviewer` revisa `main..feat/notas-1` en una copia congelada; si hay hallazgos, el delta vuelve al mismo implementer. Evidencia: veredicto y `Review-*` en el commit de revisión.
4. **Cerrar bloque** — `/coordinar notas 1`. `docs-sync --plan notas` da el orden; encadena 1.2 y 1.3, revisa el bloque, empuja la rama y para al llegar a la PR. Evidencia: rama `feat/notas-1`, suite completa, CI y PR.
5. **Curar** — `/curar notas 1`. Lee la traza y propone 0–3 filas para `docs/harness.md`; el humano aprueba. Evidencia: fila con hueco, decisión, destino y commit.
6. **Revisar spec** — `/openspec-review notas`. Comprueba que proposal, spec, design y tasks siguen contando lo mismo. Evidencia: veredicto sobre el contrato.
7. **Verificar y archivar** — `/opsx-verify notas`, `/opsx-sync notas` y `/opsx-archive notas`. Verifica que lo implementado coincide, sincroniza las specs y archiva el cambio. Evidencia: cambio archivado.

## Lo que enseña

- El **contrato** se escribe antes que el código: sin `tasks.md` no hay `/implementar`.
- La **sesión principal** no implementa ni revisa: escribe el brief, lanza subagentes y decide las paradas.
- El **worktree** es del bloque, no de la tarea: 1.1, 1.2 y 1.3 comparten `paralelo/notas-1`.
- La **revisión** es por rango de commits, no por árbol sin commitear.
- El **curador** no cambia el código: cambia la regla que permitió el fallo.
- El **cambio** se archiva cuando el bloque está mergeado y las specs están sincronizadas.

## Un fallo del ejemplo

En 1.2, el endpoint devuelve `200` cuando la validación falla. El reviewer lo detecta. No se crea una tarea nueva: se reabre 1.2, se corrige, se vuelve a marcar y la revisión del arreglo se registra como `1.2 (delta)`. En `/curar notas 1`, la pregunta es «¿qué regla permitió que el brief no fijara el código de estado?». La respuesta puede ser una fila:

| Fecha | Origen | Hueco | Decisión | Dónde | Commit |
|---|---|---|---|---|---|
| 24-nov | Incidente | El brief no fijaba el código de estado de validación | Añadir el contrato HTTP al criterio de aceptación | `implementar` | `pendiente` |

Eso es curar: no parchear el síntoma, cerrar el hueco que lo hizo posible.

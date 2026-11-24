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

## Los comandos

| Comando | Cuándo | Qué hace |
|---|---|---|
| `/opsx-propose` | Antes de escribir código | Crea proposal, spec, design y tasks. |
| `/implementar` | Una tarea | Brief cerrado + `implementer`; gates y commit en el worktree. |
| `/revisar` | Una tarea o un bloque | `reviewer` sobre el rango de commits; veredicto y `Review-*`. |
| `/coordinar` | Un bloque | Encadena las tareas listas; para en las paradas. |
| `/curar` | Cierre de bloque, semana o cambio | Propone filas para `docs/harness.md`; el humano aprueba. |
| `/openspec-review` | Cierre de cambio | Revisa coherencia entre proposal, spec, design y tasks. |
| `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | Cierre | Verifica, sincroniza specs y archiva. |

`/implementar` y `/revisar` son **por tarea**; `/coordinar` es **por bloque**. En el ejemplo, 1.1 es `[HARD]` y se revisa sola; por eso se hace primero. Después, `/coordinar` encadena 1.2 y 1.3. Si lanzas `/coordinar notas 1` desde el principio, haría 1.1 y pararía tras su revisión `[HARD]`; el ejemplo separa 1.1 para que se vea el comando de tarea.

<svg class="diagram" viewBox="0 0 760 210" role="img" aria-label="Secuencia: planificar, tarea HARD, bloque FAST, PR y cierre">
  <defs>
    <marker id="ex1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <rect x="10" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="76" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Planificar</text>
  <text x="76" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">opsx-propose</text>
  <text x="76" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">contrato</text>

  <line class="draw" pathLength="1" x1="142" y1="75" x2="150" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="154" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="220" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Tarea [HARD]</text>
  <text x="220" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">implementar</text>
  <text x="220" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">revisar 1.1</text>

  <line class="draw" pathLength="1" x1="286" y1="75" x2="294" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="298" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="364" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Bloque [FAST]</text>
  <text x="364" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">coordinar 1</text>
  <text x="364" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">1.2 + 1.3</text>

  <line class="draw" pathLength="1" x1="430" y1="75" x2="438" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="442" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="508" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">PR</text>
  <text x="508" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">CI + merge</text>
  <text x="508" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">suite completa</text>

  <line class="draw" pathLength="1" x1="574" y1="75" x2="582" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="586" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="652" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Cierre</text>
  <text x="652" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">curar</text>
  <text x="652" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">openspec-review</text>

  <path d="M 652 118 C 652 180, 76 180, 76 122" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ex1)"/>
  <text x="380" y="196" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="11">la siguiente pasada empieza con mejores reglas</text>
</svg>

## La secuencia

1. **Planificar** — `/opsx-propose notas`. OpenSpec crea proposal, spec, design y tasks. No se toca código. Evidencia: `openspec/changes/notas/`.
2. **Primera tarea** — `/implementar notas 1.1`. La sesión principal escribe el brief y lanza `implementer` con el modelo de `[HARD]`; implementa, prueba, muta y commitea en `paralelo/notas-1`. Evidencia: commit con `Brief-*`, build, tests y 2 mutaciones rojas.
3. **Revisar** — `/revisar notas 1.1`. `reviewer` revisa `main..feat/notas-1` en una copia congelada; si hay hallazgos, el delta vuelve al mismo implementer. Evidencia: veredicto y `Review-*` en el commit de revisión.
4. **Cerrar bloque** — `/coordinar notas 1`. `docs-sync --plan notas` da el orden; encadena 1.2 y 1.3, revisa el bloque, empuja la rama y para al llegar a la PR. Evidencia: rama `feat/notas-1`, suite completa, CI y PR.
5. **Curar** — `/curar notas 1`. Lee la traza y propone 0–3 filas por tanda para `docs/harness.md`; el humano aprueba. Evidencia: fila con hueco, decisión, destino y commit.
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

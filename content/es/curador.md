# El curador: la pieza que hace que la fábrica aprenda

Sin curador, una fábrica hace trabajo. Con curador, **mejora el sistema que hace el trabajo**. La diferencia entre las dos es la misma que entre un workflow y una fábrica.

> El curador no es un agente autónomo: es el comando `/curar` de la sesión principal, guiado por el registro de `docs/harness.md`.

<svg class="diagram" viewBox="0 40 760 170" role="img" aria-label="De la traza al registro y a la regla">
  <defs>
    <marker id="c1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <rect x="10" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="90" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Traza</text>
  <text x="90" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">agente · coste · causa</text>

  <rect x="200" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="280" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Registro</text>
  <text x="280" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">hueco · decisión</text>

  <rect x="390" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="470" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Regla</text>
  <text x="470" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">dónde vive · commit</text>

  <rect x="580" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="660" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Siguiente pasada</text>
  <text x="660" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">mejores reglas</text>

  <line class="draw" pathLength="1" x1="170" y1="86" x2="196" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1)"/>
  <line class="draw" pathLength="1" x1="360" y1="86" x2="386" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1)"/>
  <line class="draw" pathLength="1" x1="550" y1="86" x2="576" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1)"/>

  <path d="M 660 126 C 660 178, 90 178, 90 128" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#c1)"/>
  <text x="380" y="198" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="11">el incidente se convierte en una fila; la fila, en una regla con commit</text>
</svg>

## De la traza a la regla

Cada bloque deja evidencia: tareas, coste, deltas, veredictos y causas. El curador la lee y se hace una pregunta incómoda: **¿qué regla permitió que esto pasara?**

- Un brief ambiguo que provocó dos rondas de cambios → se cierra el brief.
- Un test que pasó con la mutación aplicada → se corrige el test.
- Un comando que se colgó en el runner → se deniega.
- Una regla repetida en dos ficheros → se elimina de uno.

El resultado no es una nota en un chat: es una fila en el registro, con hueco, decisión, dónde vive y commit.

## El registro

Un registro real tiene esta forma. Ejemplo de fila:

| Fecha | Origen | Hueco | Decisión | Dónde | Commit |
|---|---|---|---|---|---|
| 21-nov | Incidente | Una tarea crítica tocó 6 ficheros y agotó el contexto | Partir si toca >3 ficheros o mezcla flujos | AGENTS.md | `a1b2c3d` |

El registro no guarda cualquier cambio. Guarda **decisiones**: lo que cambió el comportamiento del sistema. Un ajuste de presupuesto o una versión de paquete no entran; si entraran, el registro dejaría de servir para entender por qué el sistema es como es.

## La cadencia

El curador no se ejecuta por inspiración. La cadencia recomendada es:

- **Al cerrar un bloque**, si hubo un incidente o un patrón.
- **Al cerrar un cambio**, antes de archivar.
- **Opcionalmente una vez por semana**, si no ha habido cierres recientes y hay traza acumulada.

El comando es `/curar <cambio> [bloque]` o `/curar --semana` como barrido opcional. Propone 0–3 filas por tanda y no cambia una regla sin aprobación.

No hay un cron que cure: la comprobación periódica solo valida la documentación. La curación es una revisión humana.

Diez minutos bastan si la traza existe. Sin traza, el curador adivina, y un curador que adivina es otro generador de deuda.

## Qué evita

- **Reglas zombis**: reglas que ya no aplican y nadie se atreve a borrar.
- **Duplicación**: el mismo hecho en dos documentos, con dos versiones.
- **Falsa autonomía**: un bucle que funciona porque el humano corrige en silencio.
- **Complejidad sin retorno**: un script nuevo que nadie ejecuta.

## Lo que no es

No es un informe bonito para enseñar. Es un **sistema de control**: si una regla no se puede comprobar, no es una regla, es una intención.

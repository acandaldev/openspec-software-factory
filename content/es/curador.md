# El curador: la pieza que hace que la fábrica aprenda

Sin curador, una fábrica hace trabajo. Con curador, **mejora el sistema que hace el trabajo**. La diferencia entre las dos es la misma que entre un workflow y una fábrica.

## De la traza a la regla

Cada bloque deja evidencia: tareas, coste, deltas, veredictos y causas. El curador la lee y se hace una pregunta incómoda: **¿qué regla permitió que esto pasara?**

- Un brief ambiguo que provocó dos rondas de cambios → se cierra el brief.
- Un test que pasó con la mutación aplicada → se corrige el test.
- Un comando que se colgó en el runner → se deniega.
- Una regla repetida en dos ficheros → se elimina de uno.

El resultado no es una nota en un chat: es una fila en el registro, con hueco, decisión, dónde vive y commit.

## El registro

```markdown
| Fecha | Origen | Hueco | Decisión | Dónde | Commit |
|---|---|---|---|---|---|
| 21-nov | Incidente | Una tarea crítica tocó 6 ficheros y agotó el contexto | Partir si toca >3 ficheros o mezcla flujos | AGENTS.md | `a1b2c3d` |
```

El registro no guarda cualquier cambio. Guarda **decisiones**: lo que cambió el comportamiento del sistema. Un ajuste de presupuesto o una versión de paquete no entran; si entraran, el registro dejaría de servir para entender por qué el sistema es como es.

## La cadencia

El curador no se ejecuta por inspiración. Se ejecuta:

- **Al cerrar un bloque**, si hubo un incidente o un patrón.
- **Una vez por semana**, leyendo paradas, deltas y causas.
- **Al cerrar un cambio**, antes de archivar.

Diez minutos bastan si la traza existe. Sin traza, el curador adivina, y un curador que adivina es otro generador de deuda.

## Qué evita

- **Reglas zombis**: reglas que ya no aplican y nadie se atreve a borrar.
- **Duplicación**: el mismo hecho en dos documentos, con dos versiones.
- **Falsa autonomía**: un bucle que funciona porque el humano corrige en silencio.
- **Complejidad sin retorno**: un script nuevo que nadie ejecuta.

## Lo que no es

No es un informe bonito para enseñar. Es un **sistema de control**: si una regla no se puede comprobar, no es una regla, es una intención.

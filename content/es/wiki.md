# La capa wiki: opcional, no un requisito

El patrón de wiki con LLM es potente: fuentes inmutables, páginas generadas, índice, registro y lint. Pero no todo proyecto necesita una wiki, y un proyecto con buena documentación puede empeorar si le añades otra capa. En la versión actual la wiki es solo diseño: no hay módulo que activar.

## Cuándo tiene sentido

- Acumulas **investigación externa**: papers, artículos, notas de clientes, comparativas.
- Necesitas **trazabilidad a la fuente**: qué documento respalda cada afirmación.
- El conocimiento **cruza temas** y quieres que las conexiones se conserven.
- Varias personas o sesiones consultan lo mismo y nadie quiere reconstruirlo.

## Cuándo no

- Tu documentación ya es operativa: contrato, runbooks, estado. Añadir `raw/` sería una carpeta más para mantener.
- El conocimiento cambia a diario y la wiki se quedaría vieja.
- No hay quien la lea: una wiki sin lectores es deuda de contexto.

## Las tres capas

```
raw/       fuentes inmutables. El agente lee, nunca escribe.
wiki/      páginas generadas: concepts, entities, sources, comparisons.
schema     AGENTS.md con las convenciones y los flujos.
```

Y dos ficheros especiales: `index.md` (catálogo que se lee primero) y `log.md` (registro cronológico append-only).

## Las operaciones

- **Ingest**: una fuente entra, se resume, se conecta con lo que ya existe y se registra.
- **Query**: se lee el índice, se eligen las páginas relevantes y se sintetiza con citas.
- **Lint**: contradicciones, páginas huérfanas, enlaces rotos y afirmaciones caducadas.

## La parte que merece la pena copiar

El lint **determinista**: enlaces rotos, páginas sin entrantes, frontmatter incompleto, fuentes que ya no existen. Eso se puede comprobar con un script y hacer que falle el CI.

El lint semántico —«estas dos páginas se contradicen»— es útil como revisión manual, pero no como gate: un modelo que se equivoca no debe bloquear un merge.

## Relación con `docs/`

No son lo mismo:

| `docs/` | `wiki/` |
|---|---|
| Documentación del proyecto | Conocimiento acumulado |
| Contrato, runbooks, estado | Conceptos, fuentes, comparativas |
| Se escribe a mano | La mantiene el agente |
| Caduca por fecha | Caduca por fuente nueva |

Si el proyecto ya tiene `docs/` maduro, la wiki empieza como **carpeta de investigación**, no como segunda documentación.

## Recomendación

La wiki no es una pieza del método: es un módulo opcional. Adóptala solo si acumulas fuentes externas y necesitas trazabilidad; si tu documentación operativa ya es madura, no añadas la capa.

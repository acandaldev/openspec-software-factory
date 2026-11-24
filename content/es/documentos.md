# Un hecho, un sitio

La documentación no es un archivo: es el contexto que el agente lee antes de trabajar. Si un dato vive en dos sitios, uno de los dos acabará mintiendo.

## Las capas

| Capa | Qué contiene | Cuándo se lee |
|---|---|---|
| **Especificación** | Qué debe ser verdad, con escenarios | Antes de implementar |
| **Contrato** | Stack, comandos, límites, trampas | Siempre |
| **Runbook** | Operación, despliegue, rollback | Al tocar infraestructura |
| **Estado** | Qué está hecho, qué está bloqueado | Al abrir sesión o cambiar de bloque |
| **Registro** | Por qué una regla es como es | Cuando una regla no se entiende |
| **Evaluación** | Outcomes y evidencia | Al cerrar un cambio |

## El contrato

Un solo fichero de reglas en la raíz, y uno por lado cuando el proyecto tiene lados distintos (backend, front). El contrato no cuenta la historia de cada regla: solo la regla. El porqué vive en el registro.

> Si una regla necesita tres párrafos para justificarse, el problema no es la regla: es que no está decidida.

## El estado

La memoria operativa es corta a propósito: estado, decisiones vigentes y pendientes. No es un diario ni un inventario. El detalle técnico vive en los runbooks; la cronología, en el historial de cambios.

Un estado de 300 líneas no se lee. El límite orientativo es 85 líneas; cuanto más corto, mejor.

## El índice

El índice de documentación se genera: recorre los ficheros, lee su frontmatter y escribe la tabla con tipo, secciones, estado, caducidad y tamaño. No se edita a mano.

```yaml
---
type: Runbook
hint: despliegue, pre y producción
stale_after: 2027-02-13
---
```

El CI falla si un documento no declara su tipo, si el índice no coincide o si una caducidad venció. Así el mapa no envejece en silencio.

## La caducidad

Una fecha de revisión no es burocracia: es la forma de detectar un runbook que ya no describe el servidor. El cron semanal existe para encontrar un documento vencido sin que nadie haya tocado nada.

## Lo que no se documenta

- Semántica genérica del framework.
- Pasos de consola que se deducen del código.
- Decisiones ya cerradas en la especificación.
- El detalle de una tarea: eso va en su traza y su commit.

Documentar de más cuesta contexto en cada turno. Documentar de menos cuesta rework. La regla es: **lo que el agente necesita para no equivocarse, y nada más**.

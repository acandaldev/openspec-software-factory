# El problema no es escribir código

El cuello de botella de un agente no es la velocidad con la que escribe. Es todo lo que ocurre alrededor: qué leer, qué decidir, qué demostrar y qué corregir después.

## Tres síntomas

### 1. El contexto vive en la conversación

Un agente recuerda el stack, las decisiones y el estado mientras la sesión está abierta. Al cerrarla, vuelve a cero. La siguiente sesión reconstruye el contexto a base de preguntas, o peor, lo inventa.

> Un prompt largo no es contexto: es una lista de deseos que nadie puede verificar.

### 2. El humano hace de middleware

Elegir la tarea, escribir el brief, revisar la salida, decidir si se relanza y cuándo parar. El agente escribe, pero el humano sostiene el bucle. Eso no escala: cuanto mejor trabaja el agente, más rápido llega la siguiente decisión a la cola.

### 3. El sistema no compone

El mismo error se repite porque nadie reescribe la regla que lo permitió. La conversación donde se explicó se perdió; el documento que lo prohibía estaba desactualizado; el test que debía cubrirlo probaba otra cosa.

## Qué cuesta

- **Tiempo**: esperar entre pasos, releer, repetir instrucciones.
- **Rework**: la misma tarea vuelve dos y tres veces porque el brief no estaba cerrado.
- **Deriva**: el código y la especificación se separan sin que nadie lo note.
- **Riesgo**: un agente sin límites en una máquina con acceso a todo.

## Por qué OpenSpec solo no basta

OpenSpec resuelve la primera mitad: define **qué debe ser verdad** con propuestas, requisitos, escenarios y tareas. Es el contrato.

No resuelve la segunda: **quién lo ejecuta, con qué evidencia y cómo se corrige el sistema que lo ejecuta**. Eso es lo que añade la fábrica.

| Capa | OpenSpec | Fábrica |
|---|---|---|
| Qué debe ser verdad | ✅ | ✅ |
| Quién lo ejecuta | — | Subagentes con brief |
| Cómo se demuestra | — | Gates y mutación |
| Qué se aprendió | — | Traza y curador |
| Cuándo para | — | Paradas tasadas |

La fábrica no sustituye a OpenSpec: lo ejecuta.

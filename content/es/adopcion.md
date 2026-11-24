# Cómo se adopta

El método se copia a un proyecto, se configura con unos pocos datos y se verifica. No es una instalación de plataforma: es un repositorio con reglas y gates.

## Requisitos

- **OpenSpec** para las especificaciones y las tareas.
- **Git** y un CI (GitHub Actions en la implementación de referencia).
- **OpenCode** como harness de la v1: subagentes, permisos por agente y comandos.
- **Node** para los scripts de documentación y plan.

## Los campos del proyecto

| Campo | Ejemplo |
|---|---|
| Nombre y slug | `acme-booking` |
| Solución o proyecto principal | `backend/Acme.sln` |
| Directorios | `front/`, `backend/` |
| URLs | producción, pre, API |
| Modelos por nivel | implementar, revisar `[HARD]`, revisar NORMAL |
| CI | workflows y comandos de gates |
| Documentos excluidos por defecto | auditorías, documentación de cliente |
| Versiones | Node, SDK, OpenSpec |

Todo eso vive en **un solo fichero** de configuración. Si un dato aparece en dos sitios, el generador debe fallar.

## Pasos

1. **Crear el proyecto** y su repositorio.
2. **Inicializar OpenSpec** y escribir la primera propuesta.
3. **Copiar el core**: contrato, agentes, comandos, scripts y workflows de documentación.
4. **Rellenar la configuración** con los campos anteriores.
5. **Instalar el harness de OpenCode**: agentes, comandos, permisos y configuración.
6. **Verificar**: `docs-sync --check`, `--plan` y un build en seco.
7. **Primera tarea** con el brief cerrado y los gates.

## Harness y adaptadores

La v1 se construye y se prueba sobre **OpenCode**. No es una dependencia del método —el contrato, los gates y la traza son ficheros y git—, pero sí de las capacidades que el bucle usa: subagentes, permisos por agente y sesiones reanudables.

| Harness | Estado en la v1 |
|---|---|
| OpenCode | soportado |
| Claude Code | extensión prevista |
| Codex | extensión prevista |
| Gemini CLI | extensión prevista |

Un adaptador traduce la misma fuente al formato de cada asistente. No se implementa ninguno hasta validar el método: mantener dos harness antes de que el primero funcione duplica el mantenimiento. Si un asistente no tiene subagentes o permisos, el bucle se degrada a un agente único y el límite se documenta.

## Qué no copiar

- Los documentos de dominio de otro proyecto.
- Las herramientas de diagnóstico personal.
- Las credenciales, los dominios y las rutas concretas.
- La historia de decisiones: cada proyecto escribe la suya.

## Cómo saber que está bien

- Un documento nuevo sin `type` **rompe** el CI.
- Una tarea sin dependencia declarada **se ve** en el plan.
- Un commit de tarea sin brief **se detecta** en la revisión.
- Un cambio de harness sin fila en el registro **se nota**.
- Un secreto o un dato del proyecto real **rompe** el build.

Si nada de eso falla, el método está decorando, no controlando.

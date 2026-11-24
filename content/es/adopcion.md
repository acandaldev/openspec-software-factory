# Cómo se adopta

El método se copia a un proyecto, se configura con unos pocos datos y se verifica. No es una instalación de plataforma: es un repositorio con reglas y gates.

<svg class="diagram" viewBox="0 20 760 90" role="img" aria-label="Seis pasos para adoptar el método">
  <line x1="50" y1="50" x2="710" y2="50" stroke="#22303a" stroke-width="2"/>
  <line class="draw" pathLength="1" x1="50" y1="50" x2="710" y2="50" stroke="#6ee7a8" stroke-width="2"/>

  <g class="fade" style="animation-delay:.05s">
    <circle cx="50" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">1</text>
    <text x="50" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Repo</text>
    <text x="50" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">crear</text>
  </g>

  <g class="fade" style="animation-delay:.12s">
    <circle cx="182" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="182" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">2</text>
    <text x="182" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">OpenSpec</text>
    <text x="182" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">init</text>
  </g>

  <g class="fade" style="animation-delay:.19s">
    <circle cx="314" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="314" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">3</text>
    <text x="314" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Core</text>
    <text x="314" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">copiar</text>
  </g>

  <g class="fade" style="animation-delay:.26s">
    <circle cx="446" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="446" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">4</text>
    <text x="446" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Config</text>
    <text x="446" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">8 campos</text>
  </g>

  <g class="fade" style="animation-delay:.33s">
    <circle cx="578" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="578" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">5</text>
    <text x="578" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">OpenCode</text>
    <text x="578" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">harness</text>
  </g>

  <g class="fade" style="animation-delay:.40s">
    <circle cx="710" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="710" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">6</text>
    <text x="710" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Verificar</text>
    <text x="710" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">gates</text>
  </g>
</svg>

<!-- TOC -->

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

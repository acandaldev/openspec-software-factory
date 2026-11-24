# Qué añade la fábrica a OpenSpec

OpenSpec ya resuelve la especificación: propuesta, requisitos, escenarios y tareas. La fábrica no compite con eso; lo ejecuta. Esta página separa lo que aporta cada capa, sin vender humo.

## Comparación honesta

| Capacidad | OpenSpec | Fábrica |
|---|---|---|
| Requisitos y escenarios | ✅ | ✅ (los usa) |
| Tareas con dependencias | ✅ | ✅ (las consulta) |
| Delegación en subagentes | — | ✅ |
| Brief cerrado por tarea | — | ✅ |
| Gates de build, test y formato | — | ✅ |
| Mutación como prueba del test | — | ✅ |
| Traza con agente, coste y resultado | — | ✅ |
| Brief y veredicto en el commit | — | ✅ |
| Revisión por rango de commits | — | ✅ |
| Registro de decisiones y curador | — | ✅ |
| Harness OpenCode (subagentes y permisos) | — | ✅ (v1) |
| Adaptadores para otros harness | — | previsto, fuera de la v1 |
| Archivo del cambio | ✅ | ✅ |

## Qué añade cada pieza

- **El brief** convierte una tarea en un contrato verificable: ficheros, criterio y modelo.
- **Los gates** convierten «está hecho» en evidencia reproducible.
- **La mutación** convierte un test verde en un test que prueba algo.
- **La traza** convierte el trabajo en datos: qué costó, qué falló y por qué.
- **El curador** convierte los datos en reglas para la siguiente pasada.
- **El harness de OpenCode** hace ejecutable el método: subagentes, permisos y comandos nativos. Los adaptadores para otros asistentes quedan como extensión documentada, no como promesa de la v1.

## Lo que no promete

> No es un benchmark. No hay una métrica independiente que diga que este método es un 30 % mejor. Hay evidencia local: gates que se ejecutan, mutaciones que fallan y un registro con fecha y commit.
>
> No elimina la revisión humana. La concentra en las puertas que importan.
>
> No funciona sin especificación. Un agente sin contrato ejecuta rápido lo que no debe.

## De dónde viene

La arquitectura de cuatro piezas —contexto, agente, traza y curador— aparece en la industria con distintos nombres. Este método la aplica a un proyecto real con OpenSpec como contrato, subagentes como ejecutores y git como trazabilidad.

- **Software factory**: la tesis de que el equipo construye el sistema que escribe el software, no el software línea a línea.
- **LLM Wiki**: la idea de que el conocimiento se compila una vez y se mantiene, en vez de re-derivarse en cada consulta. Aquí inspira una **capa opcional**, no el núcleo del template.
- **Meta-harness**: la idea de que el harness se instala con un plan visible y se puede auditar.

La diferencia es el punto de partida: aquí el contrato es OpenSpec y el objetivo es que el agente lo ejecute sin perder la evidencia.

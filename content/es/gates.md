# La evidencia decide, no el agente

Un agente puede decir «está hecho». Los gates deciden si es verdad. La regla es simple: **sin evidencia, no hay commit**.

## Los cinco gates

| Gate | Comando | Qué demuestra |
|---|---|---|
| Build | compilar el proyecto | El código es coherente |
| Tests | filtrar las clases tocadas | Lo que cambió funciona |
| Formato | verificar sin escribir | No hay ruido en el diff |
| Spec | validar el cambio | Los escenarios siguen siendo válidos |
| Mutación | romper el test a propósito | El test prueba algo |

## La mutación

Un test que pasa siempre no demuestra nada. La mutación cambia el código de producción, ejecuta el test y exige que falle. Después se revierte **con la edición inversa**, nunca con `git checkout`, y se verifica que el árbol queda limpio.

```
1. aplicar mutación
2. ejecutar el filtro  → debe fallar
3. revertir con edición inversa
4. git status --short  → vacío
5. pasada verde final
```

Un commit no puede contener marcadores de mutación ni apoyarse en un verde anterior a la reversión.

## Gates de tarea y de bloque

- **Durante la tarea** se ejecuta el filtro de las clases tocadas. La suite completa es demasiado lenta para cada paso.
- **Al cerrar el bloque** se ejecuta la suite completa, antes de la PR.
- **El reviewer** repite los gates que apliquen al lado tocado y añade las mutaciones en una copia congelada.

## CI

El CI no sustituye a los gates locales: los confirma en un entorno limpio. Un run rojo que nadie mira es un verde falso; por eso cada push espera su resultado antes de seguir.

| Workflow | Cuándo |
|---|---|
| Backend | PR que toca `backend/` |
| Front | PR que toca `front/` |
| Docs | cambios en documentación y harness |
| Pre-deploy | push a `main`: gates, despliegue de pre y smoke |
| Producción | manual, con confirmación explícita |

## Las paradas

Los gates no deciden todo. El bucle para cuando:

- Un gate no puede ejecutarse por permisos del entorno.
- El test no cubre lo que dice la tarea.
- La mutación no produce rojo.
- El CI falla por una causa que el reintento no arregla.

Cada parada deja el motivo. Sin motivo, no hay forma de corregir la causa.

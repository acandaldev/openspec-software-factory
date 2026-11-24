# La fábrica que ejecuta tus especificaciones

OpenSpec define **qué debe ser verdad**. Esta fábrica añade **quién lo ejecuta**, con qué pruebas y cómo se corrige el sistema que lo ejecuta.

No es un prompt largo ni un chatbot con herramientas. Es un método con cuatro piezas, cuatro bucles y una regla: cada decisión deja rastro en git.

<div class="stats">
  <div class="stat"><b>{{loops}}</b><span>bucles anidados</span></div>
  <div class="stat"><b>{{agents}}</b><span>subagentes</span></div>
  <div class="stat"><b>{{commands}}</b><span>comandos propios</span></div>
  <div class="stat"><b>{{decisions}}</b><span>decisiones registradas</span></div>
</div>

## El problema

Un agente con un buen prompt sigue siendo un prompt. Sabe escribir código; no sabe qué se decidió ayer, por qué se descartó una alternativa ni qué se rompió la última vez.

- **El contexto vive en la conversación.** Al cerrar la sesión, se pierde.
- **El humano hace de middleware.** Elige la tarea, escribe el brief, revisa, relanza y decide cuándo parar.
- **El sistema no compone.** El mismo error se repite porque nadie reescribe las reglas a partir de lo que pasó.

Una fábrica resuelve las tres cosas: el contexto vive en el repositorio, el trabajo se delega con contrato y la traza alimenta una revisión periódica del propio método.

## Las cuatro piezas

<div class="cards">
  <div class="card"><h3>Contexto compartido</h3><p>Especificaciones, contrato, runbooks y estado. El agente lo lee antes de empezar; no lo reconstruye de memoria.</p></div>
  <div class="card"><h3>Agentes con gates</h3><p>Un subagente implementa, otro revisa con un modelo distinto y los gates de build, test y formato deciden si hay commit.</p></div>
  <div class="card"><h3>Traza</h3><p>Cada tarea deja agente, coste, resultado y criterio de aceptación. El commit guarda el brief en trailers.</p></div>
  <div class="card"><h3>Curador</h3><p>Un registro de decisiones lee la traza y reescribe las reglas. Cada incidente se convierte en una regla con su commit.</p></div>
</div>

## Cuatro bucles anidados

```
PROYECTO  (meses)      estado y decisiones
└ CAMBIO  (semanas)    specs, diseño y tareas
  └ BLOQUE (días)      rama, PR y ventana de despliegue
    └ TAREA (horas)    brief, implementación, gates y revisión
```

Cada nivel tiene su artefacto y su puerta. La tarea no cierra si los gates no están en verde; el bloque no cierra si la revisión no está aprobada; el cambio no se archiva si sus outcomes no están verificados.

## Para quién es

- Equipos que ya escriben especificaciones y quieren que un agente las ejecute **sin perder el control**.
- Developers que trabajan solos con varios asistentes y necesitan continuidad entre sesiones.
- Proyectos donde el coste de un error no es solo tiempo: datos, pagos o producción.

## Qué no es

> No es un framework de agentes ni una librería. Son reglas, artefactos y gates que se copian a un repositorio.
>
> No sustituye la revisión humana. La reduce a las puertas donde aporta: alcance, permisos, merge y producción.
>
> No promete autonomía total. Promete que cuando el agente trabaja solo, deja evidencia de lo que hizo.

<a class="cta" href="{{repo}}">Ver el repositorio</a>

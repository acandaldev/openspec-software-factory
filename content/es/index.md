# La fábrica que ejecuta tus especificaciones

OpenSpec define qué debe ser verdad. La fábrica pone el agente que lo ejecuta, los gates que lo demuestran y la revisión que lo corrige.

<div class="story" data-reveal>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>
    <span class="story-label">Spec</span>
    <strong>Qué debe ser verdad</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>
    <span class="story-label">Agente</span>
    <strong>Implementa y pasa los gates</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    <span class="story-label">Revisión</span>
    <strong>Veredicto y traza en git</strong>
  </div>
  <p class="story-loop"><span aria-hidden="true">↺</span> El curador convierte la traza en regla.</p>
</div>

Del repo a la primera tarea:

<p class="prereqs">El método necesita <strong>OpenSpec</strong>, <strong>Git</strong> y un CI. La v0.1 añade el adaptador <strong>OpenCode</strong> (<strong>Node 22+</strong>, <strong>Bash</strong>). <a href="adopcion.html#requisitos">Ver requisitos</a>.</p>

```
openspec init
node bootstrap.mjs
/opsx-propose "notas con etiquetas"
/implementar
/revisar
```

<p class="actions"><a class="cta" href="metodo.html">Ver el método</a><a class="cta ghost" href="ejemplo.html">Ver el ejemplo</a></p>

<p class="hero-badge"><a href="https://github.com/acandaldev/openspec-software-factory-template"><span class="dot"></span> Template v0.1 · OpenCode</a></p>

# La fábrica que ejecuta tus especificaciones

OpenSpec define qué debe ser verdad. La fábrica lo convierte en un plan ejecutable, lo implementa con agentes y gates, y lo revisa antes de dejarlo en git.

<div class="story">
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>
    <span class="story-label">Spec</span>
    <strong>Qué debe ser verdad</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/><path d="M11 6h9M11 12h9M11 18h9"/></svg>
    <span class="story-label">Tareas</span>
    <strong>El plan antes del código</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>
    <span class="story-label">Implementación</span>
    <strong>Un agente, brief y gates</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    <span class="story-label">Revisión</span>
    <strong>Veredicto y traza en git</strong>
  </div>
  <p class="story-loop"><span aria-hidden="true">↺</span> El curador convierte la traza en regla.</p>
</div>

<p class="section-kicker">Empieza aquí</p>
<p class="section-title">Del repo a la primera tarea</p>

1. **Crea el repositorio** desde el template ([Use this template](https://github.com/acandaldev/openspec-software-factory-template)) o copia su contenido en un proyecto existente.
2. **Instala los requisitos**: OpenSpec, Git y CI; para la v0.1, OpenCode, Node 22+ y Bash. [Ver requisitos](adopcion.html#requisitos).
3. **Configura y estrena** el método en tu copia:

```
# Inicializa OpenSpec y configura el harness
openspec init
node bootstrap.mjs

# Abre OpenCode y estrena el método
/opsx-propose "notas con etiquetas"
/implementar
/revisar
```

<p class="actions"><a class="cta" href="adopcion.html">Cómo empezar</a><a class="cta ghost" href="metodo.html">Ver el método</a><a class="cta ghost" href="ejemplo.html">Ver el ejemplo</a></p>

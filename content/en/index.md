<p class="hero-badge"><a href="https://github.com/acandaldev/openspec-software-factory-template"><span class="dot"></span> Template v0.1 · OpenCode</a></p>

# The factory that executes your specifications

OpenSpec defines what must be true. The factory turns it into an executable plan, implements it with agents and gates, and reviews it before it lands in git.

<div class="story">
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>
    <span class="story-label">Spec</span>
    <strong>What must be true</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/><path d="M11 6h9M11 12h9M11 18h9"/></svg>
    <span class="story-label">Tasks</span>
    <strong>The plan before code</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>
    <span class="story-label">Implementation</span>
    <strong>One agent, brief and gates</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    <span class="story-label">Review</span>
    <strong>Verdict and trace in git</strong>
  </div>
  <p class="story-loop"><span aria-hidden="true">↺</span> The curator turns the trace into a rule.</p>
</div>

<p class="section-kicker">Start here</p>
<p class="section-title">From repo to first task</p>

1. **Create the repository** from the template ([Use this template](https://github.com/acandaldev/openspec-software-factory-template)) or copy its contents into an existing project.
2. **Install the requirements**: OpenSpec, Git and CI; for v0.1, OpenCode, Node 22+ and Bash. [See requirements](adopcion.html#requirements).
3. **Configure and start** the method in your copy:

```
# Initialize OpenSpec and configure the harness
openspec init
node bootstrap.mjs

# Open OpenCode and run the method
/opsx-propose "notes with tags"
/implementar
/revisar
```

<p class="actions"><a class="cta" href="adopcion.html">Get started</a><a class="cta ghost" href="metodo.html">See the method</a><a class="cta ghost" href="ejemplo.html">See the example</a><a class="cta ghost star" href="https://github.com/acandaldev/openspec-software-factory-template" target="_blank" rel="noopener">★ Star on GitHub</a></p>

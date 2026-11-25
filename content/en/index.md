# The factory that executes your specifications

OpenSpec defines what must be true. The factory adds the agent that executes it, the gates that prove it and the review that corrects it.

<div class="story" data-reveal>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 16h5"/></svg>
    <span class="story-label">Spec</span>
    <strong>What must be true</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/></svg>
    <span class="story-label">Agent</span>
    <strong>Implements and passes the gates</strong>
  </div>
  <div class="story-arrow" aria-hidden="true">→</div>
  <div class="story-step">
    <svg class="story-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    <span class="story-label">Review</span>
    <strong>Verdict and trace in git</strong>
  </div>
  <p class="story-loop"><span aria-hidden="true">↺</span> The curator turns the trace into a rule.</p>
</div>

From repo to first task:

<p class="prereqs">You need <strong>OpenCode</strong>, <strong>OpenSpec</strong>, <strong>Node 22+</strong>, <strong>Git</strong> and <strong>Bash</strong>. <a href="adopcion.html#requirements">See requirements</a>.</p>

```
openspec init
node bootstrap.mjs
/opsx-propose "notes with tags"
/implementar
/revisar
```

<p class="actions"><a class="cta" href="metodo.html">See the method</a><a class="cta ghost" href="ejemplo.html">See the example</a></p>

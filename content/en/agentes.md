# Who does what

The method separates three responsibilities that a single agent mixes: coordinate, implement and review. Each has its own context, model and limits.

<svg class="diagram" viewBox="0 0 760 330" role="img" aria-label="Sequence: coordinator, implementer, gates and reviewer">
  <defs>
    <marker id="a3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>
  <rect x="18" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="93" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Coordinator</text>
  <text x="93" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">brief · order · gates</text>

  <rect x="208" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="283" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Implementer</text>
  <text x="283" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">code · tests · commit</text>

  <rect x="398" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="473" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Gates</text>
  <text x="473" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">build · test · format</text>

  <rect x="588" y="30" width="150" height="70" rx="12" fill="#131a21" stroke="#22303a"/>
  <text x="663" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Reviewer</text>
  <text x="663" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">evidence · verdict</text>

  <line class="draw" pathLength="1" x1="170" y1="65" x2="204" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a3)"/>
  <line class="draw" pathLength="1" x1="360" y1="65" x2="394" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a3)"/>
  <line class="draw" pathLength="1" x1="550" y1="65" x2="584" y2="65" stroke="#6ee7a8" stroke-width="2" marker-end="url(#a3)"/>

  <path d="M 663 104 C 663 160, 283 160, 283 104" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#a3)"/>
  <text x="473" y="180" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="12">if there are findings, the delta goes back to the same implementer</text>

  <rect x="18" y="220" width="720" height="80" rx="12" fill="#10161c" stroke="#22303a"/>
  <text x="40" y="250" fill="#93a4b3" font-family="system-ui" font-size="12">Rule</text>
  <text x="40" y="272" fill="#e6edf3" font-family="system-ui" font-size="13">the coordinator does not implement or review; the reviewer does not write production code</text>
</svg>

## Coordinator

Reads the plan, picks the ready task and writes a **closed brief**: change, tasks, level, model, acceptance criterion and expected files. Launches the implementer, checks the gates, pushes the branch and waits for CI. It does not touch code.

## Implementer

Works in the block's worktree. Implements, writes the test, runs the gates, applies a mutation and reverts it, and commits when everything is green. Marks the task and leaves the trace with agent, cost and result. It does not push.

## Reviewer

Reviews the commit range, not the uncommitted tree. Reads the requirements, checks the evidence, runs mutations in a frozen copy and issues a verdict. It does not write production code.

## Models per level

The task level decides the model and the batch size. Levels are not mixed: the highest one sets the model.

| Level | Implementation | Review |
|---|---|---|
| `[HARD]` | 1 to 1, the most capable model | 1 to 1, the most capable model |
| NORMAL | batches of 1–3, intermediate model | per block, intermediate model |
| `[FAST]` | batches of 3–5, economical model | per block, economical model |

## Permissions

A subagent cannot approve a confirmation: there is no user in its session. That is why what it may run is defined in advance. Irreversible actions are denied; routine ones are allowed; doubtful ones are asked to the human in the coordinator.

# Who does what

The method separates five responsibilities that a single agent mixes: coordinate, implement, review code, review specifications and curate the harness. The first three form the task loop; the other two run outside it. Each has its own context, model and limits.

> The **coordinator** and the **curator** are the **main session**, not subagents: they are the only ones that can ask for permissions and talk to the user. The subagents are `implementer`, `reviewer` and `openspec-reviewer`.

The names `implementer`, `reviewer` and `openspec-reviewer`, and the `/implementar` and `/revisar` commands, are those of the **OpenCode adapter for v0.1**. The roles —coordinate, implement, review and curate— are part of the method; another harness would have to translate the names and commands. [See the adapter](adopcion.html#opencode-adapter).

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
  <path id="task-flow" d="M 93 105 L 283 105 L 473 105 L 663 105 C 663 160, 283 160, 283 104" fill="none" stroke="none" aria-hidden="true"/>
  <circle id="task-dot" r="4" fill="#6ee7a8" opacity="0" aria-hidden="true"/>
</svg>

> The spec reviewer and the curator do not appear in the task flow: the former is used before coding, when closing a change or when a specification changes; the latter when closing a block or change; `--semana` is optional.

## Coordinator

Reads the plan, picks the ready task and **transcribes** the closed brief from `tasks.md`: change, tasks, block, level, model, acceptance criterion and expected files. It does not decide the level or the block. Launches the implementer, checks the gates and, when the block closes, pushes the branch and waits for CI. It does not touch code.

## Implementer

Works in the block's worktree. Implements, writes the test, runs the gates and applies the task mutations set by the level —only if there is production logic— and reverts them; the block's manual mutation is run by the reviewer. Commits when everything is green. Marks the task and leaves the trace with agent, cost and result. It does not push. It does not decide the level, block or plan.

## Reviewer

Reviews the commit range, not the uncommitted tree. Reads the requirements, checks the evidence, runs the minimum gates without duplicating the build and, only if there is production logic, runs the block mutation or verifies the `[HARD]` ones in a frozen copy. It issues a verdict. It does not write production code.

Its report includes a **scenario → evidence → status** matrix: every scenario in scope must have a test, a mutation or manual evidence. If the scenario or its requirement calls for delivering, sending or notifying, a test that only checks enqueueing does not count: the evidence must reach the delivery boundary. Every new integration point is validated with an omission mutation: remove the wiring and require a red test.

## Spec reviewer

Checks coherence between proposal, specs, design and tasks. It touches neither code nor tests: its output is a verdict on the contract. It is used before coding, when closing a change or when a specification changes.

Its report includes the **scenario → task** matrix: a scenario with no task and no cited delegated coverage (change, task and owner) is `CRITICAL`. The `SHALL`/`MUST` prevails over the scenario: if it calls for delivering, sending or notifying and no scenario reflects it, that is also `CRITICAL`.

## The three moments

| Moment | Command | Question | Output |
|---|---|---|---|
| Before coding, spec change or closure | `/openspec-review` | Is the contract coherent? | Verdict and scenario → task matrix |
| Task or block | `/revisar` | Does the implementation meet the contract? | Verdict and scenario → evidence matrix |
| Block or change closure; `--semana` optional | `/curar` | Which harness rule should change? | 0–3 proposals for `docs/harness.md` |

## Curator

Not a subagent: the main session runs it with `/curar`. It turns the trace of a block or change, or the last 7 days with `--semana`, into 0–3 proposals for `docs/harness.md`. It does not review code, does not change rules without approval and does not run per task. Cadence: block or change close; `--semana` is optional.

## Who assigns the level and the block

The **block** is the `## N.` heading in `tasks.md`; the **level** is each task's label. Both are written during planning, normally with `/opsx-propose` and human review, not while coordinating.

The coordinator reads the requested block and copies the task level into the brief; it does not invent them. Without a label, the task is treated as `NORMAL`. If a task is too large, it is split before starting and the user approves it. A block is a deliverable phase: its branch and PR.

## Models per level

The task level decides the model and the batch size. Levels are not mixed: the highest one sets the model. The canonical table — when it applies, execution, review and model — lives in [Level and review](#level-and-review).

## Permissions

A subagent cannot approve a confirmation: there is no user in its session. That is why what it may run is defined in advance. Irreversible actions are denied; routine ones are allowed; doubtful ones are escalated to the human in the coordinator.

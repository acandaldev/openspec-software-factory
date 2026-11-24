# A complete example: acme-notes

`acme-notes` is a small notes app: a backend, a UI and two people. It is not a real case; it is an imaginary project to show the full sequence without domain noise.

## The contract

The change is called `notes`. The proposal defines one capability: create and list notes. Block 1 is the first deployable slice. `tasks.md` looks like this:

```text
## 1. API and list

- [ ] 1.1 [HARD] Note model, migration and repository
- [ ] 1.2 [FAST] POST /notes with validation
- [ ] 1.3 [FAST] GET /notes and list in the UI
```

`1.1` is `[HARD]`: it touches data and is reviewed 1 to 1. `1.2` and `1.3` are `[FAST]`: they can be batched and reviewed when the block closes.

## The commands

| Command | When | What it does |
|---|---|---|
| `/opsx-propose` | Before writing code | Creates proposal, spec, design and tasks. |
| `/implementar` | One task | Closed brief + `implementer`; gates and commit in the worktree. |
| `/revisar` | One task or a block | `reviewer` over the commit range; verdict and `Review-*`. |
| `/coordinar` | A block | Chains the ready tasks; stops at the stops. |
| `/curar` | Block, week or change close | Proposes rows for `docs/harness.md`; the human approves. |
| `/openspec-review` | Change close | Checks coherence between proposal, spec, design and tasks. |
| `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | Close | Verifies, syncs specs and archives. |

`/implementar` and `/revisar` are **per task**; `/coordinar` is **per block**. In the example, 1.1 is `[HARD]` and is reviewed on its own; that is why it comes first. Then `/coordinar` chains 1.2 and 1.3. If you run `/coordinar notes 1` from the start, it would do 1.1 and stop after its `[HARD]` review; the example separates 1.1 so the single-task command is visible.

<svg class="diagram" viewBox="0 0 760 210" role="img" aria-label="Sequence: plan, HARD task, FAST block, PR and close">
  <defs>
    <marker id="ex1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <rect x="10" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="76" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Plan</text>
  <text x="76" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">opsx-propose</text>
  <text x="76" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">contract</text>

  <line class="draw" pathLength="1" x1="142" y1="75" x2="150" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="154" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="220" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Task [HARD]</text>
  <text x="220" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">implementar</text>
  <text x="220" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">review 1.1</text>

  <line class="draw" pathLength="1" x1="286" y1="75" x2="294" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="298" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="364" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Block [FAST]</text>
  <text x="364" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">coordinar 1</text>
  <text x="364" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">1.2 + 1.3</text>

  <line class="draw" pathLength="1" x1="430" y1="75" x2="438" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="442" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="508" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">PR</text>
  <text x="508" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">CI + merge</text>
  <text x="508" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">full suite</text>

  <line class="draw" pathLength="1" x1="574" y1="75" x2="582" y2="75" stroke="#6ee7a8" stroke-width="2" marker-end="url(#ex1)"/>

  <rect x="586" y="36" width="132" height="78" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="652" y="60" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13" font-weight="600">Close</text>
  <text x="652" y="80" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">curar</text>
  <text x="652" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">openspec-review</text>

  <path d="M 652 118 C 652 180, 76 180, 76 122" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ex1)"/>
  <text x="380" y="196" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="11">the next pass starts with better rules</text>
</svg>

## The sequence

1. **Plan** — `/opsx-propose notes`. OpenSpec creates proposal, spec, design and tasks. No code is touched. Evidence: `openspec/changes/notes/`.
2. **First task** — `/implementar notes 1.1`. The main session writes the brief and launches `implementer` with the `[HARD]` model; it implements, tests, mutates and commits in `paralelo/notes-1`. Evidence: commit with `Brief-*`, build, tests and 2 red mutations.
3. **Review** — `/revisar notes 1.1`. `reviewer` reviews `main..feat/notes-1` in a frozen copy; if there are findings, the delta goes back to the same implementer. Evidence: verdict and `Review-*` in the review commit.
4. **Close block** — `/coordinar notes 1`. `docs-sync --plan notes` gives the order; it chains 1.2 and 1.3, reviews the block, pushes the branch and stops at the PR. Evidence: `feat/notes-1` branch, full suite, CI and PR.
5. **Curate** — `/curar notes 1`. Reads the trace and proposes 0–3 rows per batch for `docs/harness.md`; the human approves. Evidence: row with gap, decision, destination and commit.
6. **Review spec** — `/openspec-review notes`. Checks that proposal, spec, design and tasks still tell the same story. Evidence: verdict on the contract.
7. **Verify and archive** — `/opsx-verify notes`, `/opsx-sync notes` and `/opsx-archive notes`. Verifies the implementation matches, syncs the specs and archives the change. Evidence: archived change.

## What it teaches

- The **contract** is written before the code: without `tasks.md` there is no `/implementar`.
- The **main session** does not implement or review: it writes the brief, launches subagents and decides the stops.
- The **worktree** belongs to the block, not the task: 1.1, 1.2 and 1.3 share `paralelo/notes-1`.
- **Review** is by commit range, not by uncommitted tree.
- The **curator** does not change code: it changes the rule that allowed the failure.
- The **change** is archived when the block is merged and the specs are synced.

## A failure in the example

In 1.2, the endpoint returns `200` when validation fails. The reviewer catches it. No new task is created: 1.2 is reopened, fixed, marked again, and the review of the fix is recorded as `1.2 (delta)`. In `/curar notes 1`, the question is "which rule allowed the brief not to specify the status code?". The answer may be a row:

| Date | Origin | Gap | Decision | Where | Commit |
|---|---|---|---|---|---|
| 24-nov | Incident | The brief did not specify the validation status code | Add the HTTP contract to the acceptance criterion | `implementar` | `pending` |

That is curation: not patching the symptom, closing the gap that made it possible.

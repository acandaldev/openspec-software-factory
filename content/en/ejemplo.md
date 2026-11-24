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

## The sequence

1. **Plan** — `/opsx-propose notes`. OpenSpec creates proposal, spec, design and tasks. No code is touched. Evidence: `openspec/changes/notes/`.
2. **First task** — `/implementar notes 1.1`. The main session writes the brief and launches `implementer` with the `[HARD]` model; it implements, tests, mutates and commits in `paralelo/notes-1`. Evidence: commit with `Brief-*`, build, tests and 2 red mutations.
3. **Review** — `/revisar notes 1.1`. `reviewer` reviews `main..feat/notes-1` in a frozen copy; if there are findings, the delta goes back to the same implementer. Evidence: verdict and `Review-*` in the review commit.
4. **Close block** — `/coordinar notes 1`. `docs-sync --plan notes` gives the order; it chains 1.2 and 1.3, reviews the block, pushes the branch and stops at the PR. Evidence: `feat/notes-1` branch, full suite, CI and PR.
5. **Curate** — `/curar notes 1`. Reads the trace and proposes 0–3 rows for `docs/harness.md`; the human approves. Evidence: row with gap, decision, destination and commit.
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

# Full example: acme-notes, from idea to archived change

> This walkthrough assumes you already created the repository from the template and ran `node bootstrap.mjs`. If you have not, start with [How to adopt it](adopcion.html).

`acme-notes` is a small notes app: an API, a UI and a two-person team. It is not a real case; it is an imaginary project to show the full sequence without domain noise.

The change is called `notes`. It has **two blocks** and **eleven tasks**. A block is a phase that can be deployed on its own; a task is a small piece with its own commit. The example shows when each command is called and what each step leaves behind before moving on.

## The pieces you will see

| Piece | What it is | In this example |
|---|---|---|
| **Change** | The whole job, with its proposal, specs, design and tasks. | `notes` |
| **Block** | A deliverable phase. It ends in a branch and a PR. | 1 and 2 |
| **Task** | An observable step inside the block. | `1.1`, `1.2`… |
| **Level** | The difficulty and risk of the task. | `[HARD]`, `NORMAL`, `[FAST]` |
| **Worktree** | A separate working copy so the block does not mix with `main`. | `paralelo/notes-1` |
| **Brief** | The closed instruction the coordinator hands to the implementer. | Change, task, level, model and criterion |
| **Gates** | The checks that must pass before committing. | Build, tests, format and spec |
| **Mutation** | Deliberately breaking the code to check that the test fails. | One or two per task |

## The plan is written before coding

Everything starts with planning, not code. The command `/opsx-propose notes` creates the proposal, the spec, the design and the tasks. Then a person reviews the result and adjusts blocks and levels.

The `tasks.md` for the example looks like this:

```md
## 1. Create and list notes

- [ ] 1.1 [HARD] Note model, migration and repository
- [ ] 1.2 NORMAL POST /notes with validation
- [ ] 1.3 NORMAL GET /notes and list
- [ ] 1.4 [FAST] Form to create a note
- [ ] 1.5 [FAST] Note list in the UI
- [ ] 1.6 [FAST] Empty state and error messages

## 2. Edit and archive

- [ ] 2.1 [HARD] Edit a note without losing changes
- [ ] 2.2 NORMAL Archive a note
- [ ] 2.3 [FAST] Active and archived filter
- [ ] 2.4 [FAST] Edit a note from the UI
- [ ] 2.5 [FAST] Archive from the UI
```

### How to read the levels

| Level | When it is used | How it is worked |
|---|---|---|
| `[HARD]` | Touches data, concurrency, money or something hard to undo. | One task per run, the most capable model and a review when that task ends. |
| `NORMAL` | A normal feature without special risk. | Batches of 1 to 3 tasks and a review when the block closes. |
| `[FAST]` | Small, repetitive or visual. | Batches of 3 to 5 tasks, an economical model and a review when the block closes. |

Blocks and levels are **written during planning**, normally with `/opsx-propose` and human review. The coordinator does not invent them: it reads the requested block and copies the task level. If a label is missing, the task is treated as `NORMAL`.

## The full chronology

This is the command sequence for the example, from start to finish:

| # | Moment | Command | What happens |
|---|---|---|---|
| 1 | Plan | `/opsx-propose notes` | Proposal, spec, design and `tasks.md` are born. |
| 2 | Review the contract | `/openspec-review notes` | The plan pieces are checked for coherence. |
| 3 | Block 1, `[HARD]` task | `/implementar notes 1.1` | The first task is implemented and committed. |
| 4 | Review `1.1` | `/revisar notes 1.1` | An independent reviewer issues the verdict for that task. |
| 5 | Rest of block 1 | `/coordinar notes 1` | `1.2` to `1.6` run with their reviews and stop before the PR. |
| 6 | Close block 1 | Open the PR and merge | Green CI, merge and deploy the block. |
| 7 | Curate block 1 | `/curar notes 1` | The block trace is turned into harness improvements. |
| 8 | Block 2, `[HARD]` task | `/implementar notes 2.1` | Editing without losing changes is implemented. |
| 9 | Review `2.1` | `/revisar notes 2.1` | Verdict for the data task. |
| 10 | Rest of block 2 | `/coordinar notes 2` | `2.2` to `2.5` run and stop before the PR. |
| 11 | Close block 2 | Open the PR and merge | Green CI, merge and deploy. |
| 12 | Curate block 2 | `/curar notes 2` | Final harness batch for the change. |
| 13 | Close the change | `/openspec-review`, `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | Review, verify, sync specs and archive. |

## Step by step

### 1. Plan the change

**Command:** `/opsx-propose notes`

**What happens:** OpenSpec creates a folder for the change with four pieces: `proposal.md` (what we want), `specs/notes/spec.md` (what must be true), `design.md` (how it will be done) and `tasks.md` (the work in order).

**What you look at:** `tasks.md` should have clear blocks, small tasks and one label per task. No code is touched yet.

**Why now:** without `tasks.md` there is nothing to implement or review. The contract is the input for the rest of the process.

### 2. Review the contract before coding

**Command:** `/openspec-review notes`

**What happens:** the spec reviewer reads proposal, spec, design and tasks. It does not look at code. It looks for contradictions: a capability without a spec, a task without verification or a decision that no task reflects.

**What you look at:** a verdict and, if there are findings, a list with file and line. If the plan is incoherent, fix it before implementing.

**Why now:** changing the plan is cheap; changing code built on a wrong plan is not.

### 3. Implement the `[HARD]` task of block 1

**Command:** `/implementar notes 1.1`

**What happens:** the coordinator creates the block worktree (`paralelo/notes-1`) and branch (`feat/notes-1`). It then writes the brief for `1.1` and launches the `implementer` with the `[HARD]` model. The implementer writes the model, migration and repository, adds tests, runs the gates, deliberately breaks the code to check that the test fails and reverts it. At the end it commits.

**What you look at:** task `1.1` marked `[x]`, a `feat(notes): 1.1 — …` commit, the trace with agent, cost and result, and a clean tree.

**Why now:** `1.1` is `[HARD]`: it touches data. It runs alone and is reviewed alone so a database mistake does not leak into the next tasks.

### 4. Review `1.1`

**Command:** `/revisar notes 1.1`

**What happens:** the `reviewer` reviews the commit range of the branch, not the uncommitted tree. It reads the requirements, runs the gates and mutations in a frozen copy and issues a verdict.

**What you look at:** `VEREDICTO: APROBADO` or `VEREDICTO: CAMBIOS NECESARIOS`. If there are findings, the delta goes back to the same implementer, the task is fixed and reviewed again. The maximum is three rounds.

**Why now:** `[HARD]` is reviewed per task. It is better to find a bug in `1.1` than in the block PR.

### 5. Finish block 1

**Command:** `/coordinar notes 1`

**What happens:** the coordinator reads the plan, sees that `1.1` is done and chains `1.2` to `1.6`. It groups the `NORMAL` and `[FAST]` tasks, launches the implementer and reviewer, and stops before opening the PR. When the block closes it runs the full suite and `docs-sync`.

**What you look at:** `1.2` to `1.6` marked, their commits and the block review. Branch `feat/notes-1` is ready for the PR.

**Why now:** it is the shortcut for tasks that are not `[HARD]`. If you run `/coordinar notes 1` from the start, it would do `1.1` and stop after its `[HARD]` review; that is why the example does `1.1` by hand and leaves the rest to the coordinator.

If you prefer to control each batch, use `/implementar notes 1.2-1.3`, `/revisar notes 1.2-1.3`, `/implementar notes 1.4-1.6` and `/revisar notes 1.4-1.6`. It is the same work with more calls.

### 6. Open and merge the block 1 PR

**What happens:** branch `feat/notes-1` becomes a PR against `main`. CI runs the full suite. When it is green and the review is recorded, it is merged with a merge commit, never squash: the brief trailers would be lost.

**What you look at:** green CI, merged PR and the block deployed. A block is a deployment window; do not mix two blocks in the same PR.

### 7. Curate block 1

**Command:** `/curar notes 1`

**What happens:** the curator does not review code. It reads the block trace: reviews, causes, stops and reopened tasks. It proposes up to three rows for `docs/harness.md`, each with the gap, decision, destination and commit. The human approves or rejects.

**What you look at:** a short proposal. If there is not enough evidence, it must say "nothing to curate". No rule changes without approval.

**Why now:** you just closed a block and the trace is fresh. Curating per task would be noise; curating at the end of the change would be too late.

### 8. Implement the `[HARD]` task of block 2

**Commands:** `/implementar notes 2.1` and then `/revisar notes 2.1`

**What happens:** the pattern of `1.1` repeats, now in worktree `paralelo/notes-2` and branch `feat/notes-2`. `2.1` edits a note without losing changes: it is `[HARD]` because a mistake can overwrite data.

**What you look at:** the same kind of evidence: marked task, commit, tests, mutations and verdict. If the reviewer asks for changes, fix them before moving on.

### 9. Finish block 2

**Command:** `/coordinar notes 2`

**What happens:** it chains `2.2` to `2.5`, groups the `NORMAL` and `[FAST]` tasks, reviews the block and stops before the PR. Then the PR is opened, CI is awaited and it is merged.

**What you look at:** the five block tasks closed, the full suite green and the PR merged.

### 10. Curate block 2 and close the change

**Command:** `/curar notes 2`

Then, with the change implemented and merged:

```text
/openspec-review notes
/opsx-verify notes
/opsx-sync notes
/opsx-archive notes
```

**What happens:** `/openspec-review` checks that specs, design and tasks still tell the same story. `/opsx-verify` verifies that the implementation matches. `/opsx-sync` updates the living specs. `/opsx-archive` archives the change.

**What you look at:** the change under `openspec/changes/archive/`, the updated specs and synchronized documentation. If the trace left something important, `/curar notes` may propose one last batch before archiving.

## The failure that teaches more than the happy path

During block 1, the reviewer finds that `1.2` returns `200` when validation fails. The path is not to create a new task or fix it quietly:

1. The verdict is `CAMBIOS NECESARIOS` and the cause is recorded as `test`: the test did not cover the status code.
2. Task `1.2` is reopened (`[ ]`), the endpoint and the test are fixed, and it is marked again.
3. The review of the fix is recorded as `1.2 (delta)`. No new requirements are added; the same thing is checked, better.
4. In `/curar notes 1`, the question is: "which rule allowed the brief not to specify the status code?"

The answer may be a row:

| Date | Origin | Gap | Decision | Where | Commit |
|---|---|---|---|---|---|
| 24-nov | Incident | The brief did not specify the validation status code | Add the HTTP contract to the acceptance criterion | `implementar` | `pending` |

That is curation: not patching the symptom, closing the gap that made it possible.

## What you would not do in this example

- **Do not start with `/implementar`** before creating and reading `tasks.md`.
- **Do not run `/coordinar notes 1` expecting it to skip the `[HARD]` stop**: it will stop after reviewing `1.1`.
- **Do not run `/curar` for every task**: it runs at block or change close; `--semana` is an optional sweep.
- **Do not merge with red CI** or with a pending review.
- **Do not fix a finding by weakening the test** or changing the rule so the verdict passes.
- **Do not mix two blocks in the same PR**: each block has its branch and deployment window.

## Minimal glossary

| Term | What it means |
|---|---|
| **Change** | The whole job that starts as a proposal and ends archived. |
| **Block** | A deliverable phase of the change. It deploys on its own and ends in a PR. |
| **Task** | A small, observable step inside a block. |
| **Level** | `[HARD]`, `NORMAL` or `[FAST]`; it decides model, batch size and review cadence. |
| **Brief** | The closed instruction the implementer receives. |
| **Worktree** | A separate working copy for the block, without touching `main`. |
| **Gate** | A mandatory check: build, tests, format or spec. |
| **Mutation** | Deliberately breaking the code to verify that the test catches the failure. |
| **Verdict** | The reviewer's decision: `APROBADO` or `CAMBIOS NECESARIOS`. |
| **Delta** | The fix of a task after a verdict with findings. |
| **Trace** | The record of what was done, with which agent, cost and result. |
| **Curator** | The role that turns the trace into proposals to improve the harness. |

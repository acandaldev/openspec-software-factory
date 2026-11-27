# Frequently asked questions

If you do not know which command is next, run `/estado`. It runs `docs-sync --estado` and returns a fixed table per change with the state and the next command.

## Which command should I use?

| If you want to… | Command | Who runs it |
|---|---|---|
| Create the change and its artifacts | `/opsx-propose` | main session |
| Know what is next | `/estado` | main session |
| Review the contract before coding | `/openspec-review` | `openspec-reviewer` |
| Implement a task or a batch | `/implementar` | `implementer` |
| Review code and tests | `/revisar` | `reviewer` |
| Chain the ready tasks of a block | `/coordinar` | main session |
| Improve the harness from the trace | `/curar` | main session |
| Close the change | `/opsx-verify` → `/opsx-sync` → `/opsx-archive` | main session |

The commands do not compete: each has a different scope.

| Scope | Commands | What they decide |
|---|---|---|
| Change | `/opsx-propose`, `/openspec-review` | what gets built and whether the contract is coherent |
| Block | `/coordinar` | in what order the ready tasks run |
| Task | `/implementar` | how a task is implemented |
| Gate | `/revisar` | whether the evidence holds; it is not optional |
| Closure | `/curar`, `/opsx-verify`, `/opsx-sync`, `/opsx-archive` | which rule changes and when to archive |

## `/estado`: the deterministic observer

`/estado` runs `node scripts/docs-sync.mjs --estado` and shows its output **verbatim**. It does not interpret the state or execute the recommendation.

```text
| CAMBIO | TAREAS | BLOQUE | CARRIL | PR | CI | ESTADO | MOTIVO |
|---|---|---|---|---|---|---|---|
| `acme-notes` | 11/11 | 2 | — | — | — | completo | — |
| `acme-billing` | 3/7 | 1 | `feat/acme-billing-1` | #12 | verde | listo | — |
COMANDO: /curar acme-notes
```

`ESTADO` has five fixed values: `completo`, `listo`, `aparcado`, `esperando` and `bloqueado`. A change blocked by red CI, a dirty tree or CI in progress leaves `COMANDO: —`: the human decides the next step. The table never uses the last `main` CI as if it were the lane's; without a PR, `CI` is `—`.

## Is `/coordinar` always first?

No. It is first **for a block that has already been planned**. Before it come `/opsx-propose` and `/openspec-review`.

`/coordinar` is not the coordinator of the whole project: it runs the ready tasks of a block, in plan order, and stops at the checkpoints: a freshly reviewed `[HARD]` task, the third round of `CAMBIOS NECESARIOS`, a permission, a collision, a red CI or the end of the block.

## Does `/coordinar` decide whether to implement, review or curate?

No. That decision is not its own:

- **Implement** is decided by the plan: the task is pending and its dependencies are done.
- **Review** is decided by the level: `[HARD]` per task; NORMAL and `[FAST]` per block. It is not optional.
- **Curate** belongs to block or change closure, not the task loop, and it proposes without changing rules.

If a coordinator could decide whether to review, it could skip the gate. That is why `/estado` recommends and `/coordinar` executes, but neither replaces the plan or the level.

## The three usual confusions

### `/implementar` vs `/coordinar`

`/implementar` does one specific task or batch. `/coordinar` chains the ready tasks of a block and stops at the checkpoints. For a `[HARD]` task, the usual path is `/implementar` and `/revisar`; `/coordinar` can start with it, but it will stop after its review.

### `/revisar` vs `/openspec-review`

`/revisar` looks at code and tests after implementation. `/openspec-review` looks at proposal, specs, design and tasks before coding or when closing the change. One checks the evidence; the other checks the contract.

### `/curar` vs `/revisar`

`/curar` does not review code: it reads the trace and proposes 0–3 rows for `docs/harness.md`. It does not change a rule without approval. `/revisar` issues a verdict on the implemented scope.

## What if `/revisar` returns `CAMBIOS NECESARIOS`?

The task is reopened, fixed with the same `implementer` and the delta is reviewed. The brief is not softened and the cap is three rounds; if the third is still red, it stops and the user decides.

## Where does the evidence live?

In the **scenario → evidence** matrix of the report, in the `## Revisiones` section of `tasks.md` and in the commit trailers. A test that only checks enqueueing does not cover a delivery scenario.

## What is a block and a level?

The **block** is the `## N.` heading in `tasks.md`; the **level** is each task's label (`[HARD]`, NORMAL or `[FAST]`). Both are written during planning, not while coordinating. The level decides the model and the review cadence. [See the method](metodo.html#level-and-review).

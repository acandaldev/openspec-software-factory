# The curator: the part that makes the factory learn

Without a curator, a factory does work. With a curator, **the system that does the work improves**. The difference between the two is the difference between a workflow and a factory.

## From trace to rule

Every block leaves evidence: tasks, cost, deltas, verdicts and causes. The curator reads it and asks an uncomfortable question: **which rule allowed this to happen?**

- An ambiguous brief that caused two review rounds → close the brief.
- A test that passed with the mutation applied → fix the test.
- A command that hung in the runner → deny it.
- A rule repeated in two files → remove it from one.

The result is not a note in a chat: it is a row in the record, with gap, decision, where it lives and commit.

## The record

```markdown
| Date | Origin | Gap | Decision | Where | Commit |
|---|---|---|---|---|---|
| 21-nov | Incident | A critical task touched 6 files and exhausted context | Split if it touches >3 files or mixes flows | AGENTS.md | `a1b2c3d` |
```

The record does not keep every change. It keeps **decisions**: what changed the behaviour of the system. A budget adjustment or a package version does not go in; if it did, the record would stop explaining why the system is the way it is.

## Cadence

The curator does not run on inspiration. It runs:

- **When a block closes**, if there was an incident or a pattern.
- **Once a week**, reading stops, deltas and causes.
- **When a change closes**, before archiving.

Ten minutes are enough if the trace exists. Without a trace, the curator guesses, and a curator that guesses is another source of debt.

## What it prevents

- **Zombie rules**: rules that no longer apply and nobody dares to delete.
- **Duplication**: the same fact in two documents, with two versions.
- **False autonomy**: a loop that works because the human corrects it in silence.
- **Complexity without return**: a new script nobody runs.

## What it is not

It is not a pretty report to show off. It is a **control system**: if a rule cannot be checked, it is not a rule, it is an intention.

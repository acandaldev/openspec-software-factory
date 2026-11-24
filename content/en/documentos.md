# One fact, one place

Documentation is not an archive: it is the context the agent reads before working. If a datum lives in two places, one of them will eventually lie.

## The layers

| Layer | What it holds | When it is read |
|---|---|---|
| **Specification** | What must be true, with scenarios | Before implementing |
| **Contract** | Stack, commands, limits, traps | Always |
| **Runbook** | Operation, deploy, rollback | When touching infrastructure |
| **State** | What is done, what is blocked | On session start or block change |
| **Record** | Why a rule is the way it is | When a rule is unclear |
| **Evaluation** | Outcomes and evidence | When closing a change |

## The contract

One rules file at the root, and one per side when the project has distinct sides (backend, front). The contract does not tell the story of each rule: only the rule. The why lives in the record.

> If a rule needs three paragraphs to justify itself, the problem is not the rule: it is not decided.

## State

Operational memory is short on purpose: state, current decisions and pending items. It is not a diary or an inventory. Technical detail lives in runbooks; chronology, in change history.

A 300-line state is not read. A 50-line state is read and updated.

## The index

The documentation index is generated: it walks the files, reads their frontmatter and writes the table with type, sections, state, expiry and size. It is not edited by hand.

```yaml
---
type: Runbook
hint: deploy, pre and production
stale_after: 2027-02-13
---
```

CI fails if a document does not declare its type, if the index does not match, or if an expiry date has passed. That way the map does not age in silence.

## Expiry

A review date is not bureaucracy: it is how you detect a runbook that no longer describes the server. The weekly cron exists to find an expired document without anyone touching anything.

## What is not documented

- Generic framework semantics.
- Console steps that can be inferred from code.
- Decisions already closed in the specification.
- The detail of a task: that belongs to its trace and its commit.

Documenting too much costs context every turn. Documenting too little costs rework. The rule is: **what the agent needs in order not to be wrong, and nothing more**.

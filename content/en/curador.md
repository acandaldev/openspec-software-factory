# The curator: the part that makes the factory learn

Without a curator, a factory does work. With a curator, **the system that does the work improves**. The difference between the two is the difference between a workflow and a factory.

> In v1, the curator is a review by the main session guided by the `docs/harness.md` record; it is not an autonomous agent.

<svg class="diagram" viewBox="0 40 760 170" role="img" aria-label="From trace to record and rule">
  <defs>
    <marker id="c1-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <rect x="10" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="90" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Trace</text>
  <text x="90" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">agent · cost · cause</text>

  <rect x="200" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="280" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Record</text>
  <text x="280" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">gap · decision</text>

  <rect x="390" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="470" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Rule</text>
  <text x="470" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">where it lives · commit</text>

  <rect x="580" y="50" width="160" height="72" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="660" y="78" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">Next pass</text>
  <text x="660" y="98" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">better rules</text>

  <line class="draw" pathLength="1" x1="170" y1="86" x2="196" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1-en)"/>
  <line class="draw" pathLength="1" x1="360" y1="86" x2="386" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1-en)"/>
  <line class="draw" pathLength="1" x1="550" y1="86" x2="576" y2="86" stroke="#6ee7a8" stroke-width="2" marker-end="url(#c1-en)"/>

  <path d="M 660 126 C 660 178, 90 178, 90 128" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#c1-en)"/>
  <text x="380" y="198" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="11">the incident becomes a row; the row becomes a rule with a commit</text>
</svg>

## From trace to rule

Every block leaves evidence: tasks, cost, deltas, verdicts and causes. The curator reads it and asks an uncomfortable question: **which rule allowed this to happen?**

- An ambiguous brief that caused two review rounds → close the brief.
- A test that passed with the mutation applied → fix the test.
- A command that hung in the runner → deny it.
- A rule repeated in two files → remove it from one.

The result is not a note in a chat: it is a row in the record, with gap, decision, where it lives and commit.

## The record

| Date | Origin | Gap | Decision | Where | Commit |
|---|---|---|---|---|---|
| 21-nov | Incident | A critical task touched 6 files and exhausted context | Split if it touches >3 files or mixes flows | AGENTS.md | `a1b2c3d` |

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

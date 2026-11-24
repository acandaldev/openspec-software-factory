# Four parts, one factory

The thesis is simple: an agent does not improve because of a better model, but because of a system around it that says what to read, what to produce, how to prove it, and what to fix afterwards.

<svg class="diagram" viewBox="0 90 760 220" role="img" aria-label="Cycle: context, agents, trace and curator">
  <defs>
    <marker id="arrow-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>
  <rect x="18" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="98" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Context</text>
  <text x="98" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">specs · docs · state</text>

  <rect x="208" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="288" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Agents</text>
  <text x="288" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">brief · gates · commit</text>

  <rect x="398" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="478" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Trace</text>
  <text x="478" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">cost · verdict · cause</text>

  <rect x="588" y="110" width="160" height="86" rx="14" fill="#131a21" stroke="#22303a"/>
  <text x="668" y="145" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="16" font-weight="600">Curator</text>
  <text x="668" y="168" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">rule · commit</text>

  <line class="draw" pathLength="1" x1="180" y1="153" x2="204" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow-en)"/>
  <line class="draw" pathLength="1" x1="370" y1="153" x2="394" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow-en)"/>
  <line class="draw" pathLength="1" x1="560" y1="153" x2="584" y2="153" stroke="#6ee7a8" stroke-width="2" marker-end="url(#arrow-en)"/>

  <path d="M 668 198 C 668 268, 98 268, 98 200" fill="none" stroke="#f0b429" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#arrow-en)"/>
  <text x="383" y="288" text-anchor="middle" fill="#f0b429" font-family="system-ui" font-size="12">the next pass starts with better rules</text>
</svg>

## 1. Shared context

The agent does not guess the stack, the decisions or the state. It reads them:

- **Specifications**: what must be true, with verifiable scenarios.
- **Repository contract**: commands, limits, conventions and traps.
- **Runbooks**: how to deploy, how to verify and how to roll back.
- **State**: what is done, what is blocked and what comes next.

The rule is "one fact, one place". If a datum lives in two documents, one of them will eventually lie.

## 2. Agents with gates

Work is delegated with a **closed brief**: change, tasks, level, model, acceptance criterion and expected files. The subagent implements; it does not decide the plan.

Before committing, gates decide for it:

| Gate | What it proves |
|---|---|
| Build | The code compiles |
| Filtered tests | What changed works |
| Format | No noise in the diff |
| Spec | The scenarios are still valid |
| Mutation | The test fails when it should fail |

A red mutation is the only proof that a test proves something. It is always reverted with the inverse edit, and the tree is checked clean.

## 3. Trace

Every task leaves a line with agent, cost and result. Every review leaves verdict, model and cause. And the commit stores the brief in trailers:

```
feat(bookings): 9.18b refund returns 202

Brief-Change: bookings
Brief-Level: NORMAL
Brief-Model: opencode/deepseek-v4.1-flash-1017#high
Brief-Acceptance: repeating the idempotency key returns 202 without duplicating the event
```

The trace is not a log: it is the raw material of the curator.

## 4. Curator

When a block or a change closes, someone reads what happened and rewrites the system. The symptom is not patched; the rule that allowed it is fixed.

- An incident becomes a row in the record: gap, decision, where it lives and commit.
- A rule repeated in two places is removed from one.
- A gate that detected nothing is reviewed: either it is unnecessary or it is mis-calibrated.

Without this part, the factory stays flat: it does the work, but it does not learn.

## Principles

- **One fact, one place.** Duplication is trust debt.
- **Text before code.** A rule in markdown can be reviewed; a script hides decisions.
- **Deterministic gates.** What a command can prove, a model should not decide.
- **The human at the gates.** Scope, permissions, merge and production.
- **Evidence wins.** Without a build, a test or a capture, it is not done.

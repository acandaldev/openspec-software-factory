# Four loops, one direction

The method is understood through its loops. Each has a cadence, an artifact and a gate. What changes between them is not the tool: it is the level of decision.

<svg viewBox="0 0 760 380" role="img" aria-label="Nested loops: project, change, block and task">
  <rect x="10" y="10" width="740" height="360" rx="18" fill="#10161c" stroke="#22303a"/>
  <text x="34" y="38" fill="#93a4b3" font-family="system-ui" font-size="13">PROJECT · months</text>
  <text x="720" y="38" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">state · decisions</text>

  <rect x="34" y="54" width="692" height="292" rx="14" fill="#0f151b" stroke="#22303a"/>
  <text x="56" y="80" fill="#93a4b3" font-family="system-ui" font-size="13">CHANGE · weeks</text>
  <text x="704" y="80" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">specs · design · tasks</text>

  <rect x="58" y="96" width="644" height="224" rx="12" fill="#0d1319" stroke="#22303a"/>
  <text x="80" y="122" fill="#93a4b3" font-family="system-ui" font-size="13">BLOCK · days</text>
  <text x="680" y="122" text-anchor="end" fill="#6ee7a8" font-family="system-ui" font-size="12">branch · PR · deploy</text>

  <rect x="82" y="138" width="596" height="156" rx="10" fill="#0a0e12" stroke="#22303a"/>
  <text x="104" y="166" fill="#e6edf3" font-family="system-ui" font-size="15" font-weight="600">TASK · hours</text>
  <text x="104" y="192" fill="#93a4b3" font-family="system-ui" font-size="12">brief → implement → gates → commit → review</text>
  <text x="104" y="214" fill="#93a4b3" font-family="system-ui" font-size="12">evidence: build · tests · mutation · format</text>
  <text x="104" y="236" fill="#f0b429" font-family="system-ui" font-size="12">one run = one commit</text>

  <text x="380" y="330" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="12">each level contains the next and no gate is skipped</text>
</svg>

## Project

It lives in the state and the decision record. It is not updated on every task: it changes when the environment, an operational decision or a pending item changes. Its question is "where are we and what comes next?".

## Change

It is a product unit with its own specification: proposal, requirements, design and tasks. It lives in the repository and is archived when closed. Its question is "what must be true and how do we prove it?".

## Block

It is a deliverable phase. One branch, one worktree, several tasks and one PR. Its question is "what can be deployed together without breaking anything?". The block merge is the deploy window.

## Task

It is the agent's unit of work. Its question is "what do I do now and how do I know it is right?". It is implemented in the block's worktree, reviewed by commit range, and leaves a trace.

## Level and review

The task label decides the model and the batch size. It is not a preference: it is a policy.

| Level | Execution | Review | Review model |
|---|---|---|---|
| `[HARD]` | 1 to 1 | per task | the most capable available |
| NORMAL | batches of 1–3 | per block | intermediate model |
| `[FAST]` | batches of 3–5 | per block | economical model |

`[HARD]` does not authorize large tasks: it changes the review and the model, not the size. A task is split before starting if it touches more than three production files or mixes independent flows.

## Where the loop stops

Autonomy is not "never ask". It is knowing exactly when to stop:

- A maximum-criticality task, after its review.
- A second round of changes on the same task.
- A permission that needs the human.
- A finding that is not in the plan.
- A file colliding with another lane.
- A red CI that the retry does not fix.
- The end of the block: the PR.
- The context threshold, before the model loses the thread.

Everything else keeps going. And every stop leaves a reason, so the curator can fix the cause.

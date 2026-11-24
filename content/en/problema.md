# The problem is not writing code

An agent's bottleneck is not how fast it writes. It is everything around it: what to read, what to decide, what to prove and what to fix afterwards.

## Three symptoms

### 1. Context lives in the conversation

An agent remembers the stack, the decisions and the state while the session is open. Close it and it starts from zero. The next session rebuilds context by asking, or worse, invents it.

> A long prompt is not context: it is a wish list nobody can verify.

### 2. The human becomes middleware

Pick the task, write the brief, review the output, decide whether to relaunch and when to stop. The agent writes, but the human holds the loop. That does not scale: the better the agent works, the faster the next decision reaches the queue.

### 3. The system does not compound

The same mistake repeats because nobody rewrites the rule that allowed it. The conversation where it was explained is gone; the document that forbade it was outdated; the test that should cover it proved something else.

## What it costs

- **Time**: waiting between steps, rereading, repeating instructions.
- **Rework**: the same task returns two or three times because the brief was not closed.
- **Drift**: code and specification separate without anyone noticing.
- **Risk**: an agent without limits on a machine with access to everything.

## Why OpenSpec alone is not enough

OpenSpec solves the first half: it defines **what must be true** with proposals, requirements, scenarios and tasks. It is the contract.

It does not solve the second half: **who executes it, with what evidence, and how the system that executes it gets corrected**. That is what the factory adds.

| Layer | OpenSpec | Factory |
|---|---|---|
| What must be true | ✅ | ✅ |
| Who executes it | — | Subagents with a brief |
| How it is proven | — | Gates and mutation |
| What was learned | — | Trace and curator |
| When to stop | — | Explicit stops |

The factory does not replace OpenSpec: it executes it.

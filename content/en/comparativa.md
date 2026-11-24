# What the factory adds to OpenSpec

OpenSpec already solves specification: proposal, requirements, scenarios and tasks. The factory does not compete with that; it executes it. This page separates what each layer contributes, without hype.

## Honest comparison

| Capability | OpenSpec | Factory |
|---|---|---|
| Requirements and scenarios | ✅ | ✅ (uses them) |
| Tasks with dependencies | ✅ | ✅ (queries them) |
| Delegation to subagents | — | ✅ |
| Closed brief per task | — | ✅ |
| Build, test and format gates | — | ✅ |
| Mutation as test proof | — | ✅ |
| Trace with agent, cost and result | — | ✅ |
| Brief and verdict in the commit | — | ✅ |
| Review by commit range | — | ✅ |
| Decision record and curator | — | ✅ |
| OpenCode harness (subagents and permissions) | — | ✅ (v1) |
| Adapters for other harnesses | — | planned, outside v1 |
| Change archive | ✅ | ✅ |

## What each part adds

- **The brief** turns a task into a verifiable contract: files, criterion and model.
- **Gates** turn "it is done" into reproducible evidence.
- **Mutation** turns a green test into a test that proves something.
- **The trace** turns work into data: what it cost, what failed and why.
- **The curator** turns data into rules for the next pass.
- **The OpenCode harness** makes the method executable: subagents, permissions and native commands. Adapters for other assistants remain a documented extension, not a v1 promise.

## What it does not promise

> It is not a benchmark. There is no independent metric saying this method is better. There is local evidence: gates that run, mutations that fail and a record with dates and commits.
>
> It does not remove human review. It concentrates it on the gates that matter.
>
> It does not work without a specification. An agent without a contract executes fast what it should not.

## Where it comes from

The four-part architecture —context, agent, trace and curator— appears across the industry under different names. This method applies it to a real project with OpenSpec as the contract, subagents as executors and git as traceability.

- **Software factory**: the thesis that the team builds the system that writes software, not the software line by line.
- **Factory loop**: in 2026, [Tomasz Tunguz](https://tomtunguz.com/what-kind-of-factory-will-you-build/) describes the same sequence —context, agent, trace and curator— for code and knowledge. It is an architectural convergence, not empirical validation: the article itself notes that it includes no benchmark.
- **LLM Wiki**: the idea that knowledge is compiled once and kept current, instead of re-derived on every query. Here it inspires an **optional layer**, not the template core.
- **Meta-harness**: the idea that the harness is installed with a visible plan and can be audited.

The difference is the starting point: here the contract is OpenSpec and the goal is for the agent to execute it without losing the evidence.

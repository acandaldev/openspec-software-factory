# The factory that executes your specifications

OpenSpec defines **what must be true**. This factory adds **who executes it**, with which tests, and how the system that executes it gets corrected.

It is not a long prompt or a chatbot with tools. It is a method with four parts, four loops and one rule: every decision leaves a trace in git.

<div class="stats">
  <div class="stat"><b>{{loops}}</b><span>nested loops</span></div>
  <div class="stat"><b>{{agents}}</b><span>subagents</span></div>
  <div class="stat"><b>{{commands}}</b><span>custom commands</span></div>
  <div class="stat"><b>{{decisions}}</b><span>recorded decisions</span></div>
</div>

## The problem

A well-prompted agent is still a prompt. It can write code; it does not know what was decided yesterday, why an option was discarded, or what broke last time.

- **Context lives in the conversation.** Close the session and it is gone.
- **The human becomes middleware.** Pick the task, write the brief, review, relaunch, decide when to stop.
- **The system does not compound.** The same mistake repeats because nobody rewrites the rules from what happened.

A factory fixes all three: context lives in the repository, work is delegated with a contract, and the trace feeds a periodic review of the method itself.

## The four parts

<div class="cards">
  <div class="card"><h3>Shared context</h3><p>Specifications, contract, runbooks and state. The agent reads them before starting; it does not rebuild them from memory.</p></div>
  <div class="card"><h3>Agents with gates</h3><p>One subagent implements, another reviews with a different model, and build, test and format gates decide whether there is a commit.</p></div>
  <div class="card"><h3>Trace</h3><p>Every task leaves agent, cost, result and acceptance criterion. The commit stores the brief in trailers.</p></div>
  <div class="card"><h3>Curator</h3><p>A decision log reads the trace and rewrites the rules. Every incident becomes a rule with its commit.</p></div>
</div>

## Four nested loops

```
PROJECT  (months)      state and decisions
└ CHANGE (weeks)       specs, design and tasks
  └ BLOCK (days)       branch, PR and deploy window
    └ TASK (hours)     brief, implementation, gates and review
```

Each level has its artifact and its gate. A task does not close with red gates; a block does not close without an approved review; a change is not archived until its outcomes are verified.

## Who it is for

- Teams already writing specifications that want an agent to execute them **without losing control**.
- Developers working alone with several assistants who need continuity between sessions.
- Projects where a mistake costs more than time: data, payments or production.

## What it is not

> It is not an agent framework or a library. It is rules, artifacts and gates that are copied into a repository.
>
> It does not replace human review. It reduces it to the gates where it matters: scope, permissions, merge and production.
>
> It does not promise full autonomy. It promises that when the agent works alone, it leaves evidence of what it did.

<a class="cta" href="{{repo}}">View the repository</a>

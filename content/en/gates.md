# Evidence decides, not the agent

An agent can say "it is done". The gates decide whether that is true. The rule is simple: **no evidence, no commit**.

## The five gates

| Gate | Command | What it proves |
|---|---|---|
| Build | compile the project | The code is coherent |
| Tests | filter the classes touched | What changed works |
| Format | verify without writing | No noise in the diff |
| Spec | validate the change | The scenarios are still valid |
| Mutation | break the test on purpose | The test proves something |

## Mutation

A test that always passes proves nothing. Mutation changes production code, runs the test and requires it to fail. Then it is reverted **with the inverse edit**, never with `git checkout`, and the tree is checked clean.

```
1. apply mutation
2. run the filter   → it must fail
3. revert with the inverse edit
4. git status --short → empty
5. final green pass
```

A commit cannot contain mutation markers or rely on a green pass from before the revert.

## Task and block gates

- **During the task** the filter for the classes touched runs. The full suite is too slow for every step.
- **When closing the block** the full suite runs, before the PR.
- **The reviewer** repeats the gates that apply to the side touched and adds mutations in a frozen copy.

## CI

CI does not replace local gates: it confirms them in a clean environment. A red run nobody looks at is a false green; that is why every push waits for its result before moving on.

| Workflow | When |
|---|---|
| Backend | PR touching `backend/` |
| Front | PR touching `front/` |
| Docs | changes to documentation and harness |
| Pre-deploy | push to `main`: gates, pre deploy and smoke |
| Production | manual, with explicit confirmation |

## The stops

Gates do not decide everything. The loop stops when:

- A gate cannot run because of environment permissions.
- The test does not cover what the task claims.
- The mutation does not produce red.
- CI fails for a cause the retry does not fix.

Every stop leaves a reason. Without a reason, there is no way to fix the cause.

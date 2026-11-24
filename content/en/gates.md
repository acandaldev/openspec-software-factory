# Evidence decides, not the agent

An agent can say "it is done". The gates decide whether that is true. The rule is simple: **no evidence, no commit**.

<svg class="diagram" viewBox="0 0 760 280" role="img" aria-label="Gate pipeline: build, tests, format, spec and mutation">
  <defs>
    <marker id="g1-en" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6ee7a8"/>
    </marker>
  </defs>

  <text x="10" y="20" fill="#93a4b3" font-family="system-ui" font-size="12">TASK GATES</text>
  <circle class="gate-state" cx="670" cy="28" r="5" fill="#6ee7a8"/>
  <text x="670" y="16" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">test</text>

  <rect x="10" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="70" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Build</text>
  <text x="70" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">compiles</text>

  <rect x="160" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="220" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Tests</text>
  <text x="220" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">what changed works</text>

  <rect x="310" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="370" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Format</text>
  <text x="370" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">no noise</text>

  <rect x="460" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="520" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Spec</text>
  <text x="520" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">scenarios valid</text>

  <rect x="610" y="36" width="120" height="56" rx="10" fill="#131a21" stroke="#22303a"/>
  <text x="670" y="61" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="14" font-weight="600">Mutation</text>
  <text x="670" y="79" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">the test fails</text>

  <line class="draw" pathLength="1" x1="130" y1="64" x2="156" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>
  <line class="draw" pathLength="1" x1="280" y1="64" x2="306" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>
  <line class="draw" pathLength="1" x1="430" y1="64" x2="456" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>
  <line class="draw" pathLength="1" x1="580" y1="64" x2="606" y2="64" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>

  <rect x="10" y="126" width="740" height="126" rx="12" fill="#10161c" stroke="#22303a" stroke-dasharray="5 5"/>
  <text x="30" y="154" fill="#f0b429" font-family="system-ui" font-size="12">Mutation proves that the test proves something</text>

  <rect x="40" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="115" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">apply</text>
  <text x="115" y="208" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">change production</text>

  <rect x="220" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="295" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">red test</text>
  <text x="295" y="208" text-anchor="middle" fill="#f87171" font-family="system-ui" font-size="10">must fail</text>

  <rect x="400" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="475" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">revert</text>
  <text x="475" y="208" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">inverse edit</text>

  <rect x="580" y="172" width="150" height="48" rx="8" fill="#0d1319" stroke="#22303a"/>
  <text x="655" y="192" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="13">green test</text>
  <text x="655" y="208" text-anchor="middle" fill="#6ee7a8" font-family="system-ui" font-size="10">clean tree</text>

  <line class="draw" pathLength="1" x1="190" y1="196" x2="216" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>
  <line class="draw" pathLength="1" x1="370" y1="196" x2="396" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>
  <line class="draw" pathLength="1" x1="550" y1="196" x2="576" y2="196" stroke="#6ee7a8" stroke-width="2" marker-end="url(#g1-en)"/>

  <text x="380" y="244" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="11">if it stays green, the test was not proving anything</text>
</svg>

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
- **The reviewer** repeats the gates that apply to the side touched and adds the block mutation in NORMAL/`[FAST]` —or verifies the `[HARD]` ones— in a frozen copy.

## CI

CI does not replace local gates: it confirms them in a clean environment. A red run nobody looks at is a false green; that is why every block or PR push waits for its result before moving on.

The mutation gate is local: `[HARD]` mutates during the task and in the review; NORMAL/`[FAST]` once in the block review. Always on a frozen copy. A mutation sweep in CI, if one exists, is informational: it observes, it does not approve.

The table describes patterns from the reference implementation, not a contract: each project defines its workflows and paths. The template core is the documentation workflow and the secrets gate; PR and deployment gates are added per project.

| Workflow | When |
|---|---|
| Backend / Front | PR touching that side |
| Docs | changes to documentation and harness |
| Pre-deploy | push to `main`: gates, pre deploy and smoke |
| Production | manual, with explicit confirmation |

The secrets gate always runs in CI: one that does not run protects nothing.

## The stops

Gates do not decide everything. The loop stops when:

- A gate cannot run because of environment permissions.
- The test does not cover what the task claims.
- The mutation does not produce red.
- CI fails for a cause the retry does not fix.

Every stop leaves a reason. Without a reason, there is no way to fix the cause.

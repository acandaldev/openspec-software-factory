# How to adopt it

> The executable template v0.1 is published: [openspec-software-factory-template](https://github.com/acandaldev/openspec-software-factory-template). This page describes how the method is adopted.

Adoption consists in creating the project from the template, configuring it with a few values and verifying it. It is not a platform install: it is a repository with rules and gates.

<a id="un-ejemplo-completo-acme-notes"></a>

> The full walkthrough, with two blocks and eleven tasks, has its own page: [Full example](ejemplo.html). This page stays focused on adoption.

<svg class="diagram" viewBox="0 20 760 90" role="img" aria-label="Six steps to set up and start the method">
  <line x1="50" y1="50" x2="710" y2="50" stroke="#22303a" stroke-width="2"/>
  <line class="draw" pathLength="1" x1="50" y1="50" x2="710" y2="50" stroke="#6ee7a8" stroke-width="2"/>

  <g class="fade" style="animation-delay:.05s">
    <circle cx="50" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">1</text>
    <text x="50" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Repo</text>
    <text x="50" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">template</text>
  </g>

  <g class="fade" style="animation-delay:.12s">
    <circle cx="182" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="182" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">2</text>
    <text x="182" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">OpenSpec</text>
    <text x="182" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">init</text>
  </g>

  <g class="fade" style="animation-delay:.19s">
    <circle cx="314" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="314" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">3</text>
    <text x="314" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Bootstrap</text>
    <text x="314" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">config</text>
  </g>

  <g class="fade" style="animation-delay:.26s">
    <circle cx="446" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="446" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">4</text>
    <text x="446" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Contract</text>
    <text x="446" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">review</text>
  </g>

  <g class="fade" style="animation-delay:.33s">
    <circle cx="578" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="578" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">5</text>
    <text x="578" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Verify</text>
    <text x="578" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">gates</text>
  </g>

  <g class="fade" style="animation-delay:.40s">
    <circle cx="710" cy="50" r="14" fill="#131a21" stroke="#6ee7a8" stroke-width="2"/>
    <text x="710" y="55" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12" font-weight="600">6</text>
    <text x="710" y="86" text-anchor="middle" fill="#e6edf3" font-family="system-ui" font-size="12">Change</text>
    <text x="710" y="102" text-anchor="middle" fill="#93a4b3" font-family="system-ui" font-size="10">propose</text>
  </g>
</svg>

<!-- TOC -->

## Minimal route

Setting up the harness takes 20–30 minutes. The first change, another 15.

1. **Create the repository** from the template.
2. **Initialize OpenSpec** if the project does not use it yet (`openspec init`).
3. **Run bootstrap**: `node bootstrap.mjs` (interactive or with flags).
4. **Review the contract**: `AGENTS.md`, agents and commands with no placeholders.
5. **Verify**: `docs-sync --check`, `check-secrets` and the tests.
6. **Start the method**: `/opsx-propose "<description>"` → `/implementar` → `/revisar`.

`/coordinar` and `/curar` come later; those three commands are enough to start.

## Requirements

Before you start, check what needs to be installed and what is assumed. The harness runs on Windows (Git Bash or WSL) and Linux; PowerShell is not supported:

| You need | What to do | Why |
|---|---|---|
| **OpenCode** | Install | v0.1 harness: subagents, permissions and commands. |
| **OpenSpec** | Install | Specifications and tasks; run `openspec init` if the project does not have it yet. |
| **Node.js 22+** | Install | Harness and CI only: bootstrap, `docs-sync`, `worktree-deps`, plan and tests. The generated product does not need it. |
| **Git and CI** | Have already | Branches, commits and PRs; GitHub Actions in the reference implementation. |
| **Bash** | Have already | Git Bash on Windows or WSL; agents run the gates there. PowerShell is not supported. |
| **OpenCode models** | Configure | The six model IDs from bootstrap must exist in your installation. |

## Project fields

| Field | Example |
|---|---|
| Name and slug | `acme-notes` |
| Description and stack | internal notes; Node + TypeScript |
| Source directories | `src/` |
| Commands | build, test and format |
| Models per level | implement and review `[HARD]`, NORMAL and `[FAST]` |
| Review copies | `.review` |
| Main branch | `main` |

Bootstrap asks for those values once and writes them to `harness.config.json` and the contract. If a placeholder is left unresolved, it fails.

## Harness and adapters

v0.1 is built and tested on **OpenCode**. It is not a dependency of the method —the contract, gates and trace are files and git— but it is a dependency of the capabilities the loop uses: subagents, per-agent permissions and resumable sessions.

| Harness | v0.1 status |
|---|---|
| OpenCode | supported |
| Claude Code | planned extension |
| Codex | planned extension |
| Gemini CLI | planned extension |

An adapter translates the same source into each assistant's format. None is implemented until the method is validated: maintaining two harnesses before the first one works doubles the maintenance. If an assistant has no subagents or permissions, the loop degrades to a single agent and the limit is documented.

## What not to copy

- Another project's domain documents.
- Personal diagnostic tools.
- Credentials, domains and concrete paths.
- The decision history: each project writes its own.

## How to know it works

- A new document without `type` **breaks** CI.
- A task without an explicit dependency **shows** in the plan.
- A task commit without a brief **is detected** in review.
- A harness change without a record row **is reviewed by the curator**.
- A secret or real-project piece of data **must break** the build.

If none of that fails, the method is decoration, not control.

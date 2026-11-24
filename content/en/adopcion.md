# How it is adopted

The method is copied into a project, configured with a few fields and verified. It is not a platform install: it is a repository with rules and gates.

## Requirements

- **OpenSpec** for specifications and tasks.
- **Git** and a CI (GitHub Actions in the reference implementation).
- **OpenCode** as the v1 harness: subagents, per-agent permissions and commands.
- **Node** for the documentation and plan scripts.

## Project fields

| Field | Example |
|---|---|
| Name and slug | `acme-booking` |
| Main solution or project | `backend/Acme.sln` |
| Directories | `front/`, `backend/` |
| URLs | production, pre, API |
| Models per level | implement, review `[HARD]`, review NORMAL |
| CI | workflows and gate commands |
| Documents excluded by default | audits, client documentation |
| Versions | Node, SDK, OpenSpec |

All of that lives in **one configuration file**. If a datum appears in two places, the generator must fail.

## Steps

1. **Create the project** and its repository.
2. **Initialize OpenSpec** and write the first proposal.
3. **Copy the core**: contract, agents, commands, scripts and documentation workflows.
4. **Fill the configuration** with the fields above.
5. **Install the OpenCode harness**: agents, commands, permissions and configuration.
6. **Verify**: `docs-sync --check`, `--plan` and a dry build.
7. **First task** with a closed brief and gates.

## Harness and adapters

v1 is built and tested on **OpenCode**. It is not a dependency of the method —the contract, gates and trace are files and git— but it is a dependency of the capabilities the loop uses: subagents, per-agent permissions and resumable sessions.

| Harness | v1 status |
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
- A task without a declared dependency **shows** in the plan.
- A task commit without a brief **is detected** in review.
- A harness change without a record row **is noticed**.
- A secret or real-project datum **breaks** the build.

If none of that fails, the method is decoration, not control.

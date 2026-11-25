# Few scripts, each with an owner

The temptation is to automate with scripts. The method does the opposite: it writes rules as text and keeps scripts only for what text cannot guarantee.

## The rule

> A new script is justified only if it **removes a human decision** or **prevents a document from lying**. If it only reorganizes, it does not go in. And every script needs a CI consumer; otherwise it is a personal tool.

## The ones that hold the method

### `docs-sync.mjs`

Keeps three things in sync:

- The documentation **index**, from frontmatter.
- The **progress figures** in memory, by counting tasks.
- The **archive of long traces**, moved out of `tasks.md` into a history file.

It has three modes:

```bash
node scripts/docs-sync.mjs                 # fix
node scripts/docs-sync.mjs --check         # validate; fail if anything is off
node scripts/docs-sync.mjs --plan <change> # print the plan as JSON
```

### `check-secrets.mjs`

Walks the text files and fails if it finds a credential, a user path or a term from the forbidden list. It is the gate that prevents the template from carrying data from the project it came from.

It lives in the site and in the template. A secrets gate that does not run in CI protects nothing: wire it into the documentation workflow.

```bash
node scripts/check-secrets.mjs   # fails with the finding and its line
```

The public list (`data/forbidden.json`) only holds examples. The terms for the concrete project are read from `~/.config/openspec-software-factory/forbidden.json` (or `OPENSPEC_FORBIDDEN_FILE`), outside the repository: the gate does not publish the data it watches for.

### `worktree-deps.mjs`

Links the heavy directories declared in `worktree.sharedDirs` (for instance `node_modules`) into each worktree or review copy **only when the normalized lockfile SHA-256 matches** the main tree; when it differs, it skips the link and asks for a clean install so the main tree is never polluted. On teardown (`unlink`), it removes only symlinks/junctions and runs `codegraph uninit --force` when `.codegraph/` is present. Its test suite runs in CI.

```bash
node scripts/worktree-deps.mjs link paralelo/<change>-<block>
node scripts/worktree-deps.mjs unlink paralelo/<change>-<block>
```

### `--plan`

Turns tasks into something a machine can query:

```json
{ "id": "1.2", "bloque": 1, "nivel": "NORMAL", "estado": "pendiente", "deps": ["1.1"] }
```

It answers "what is next?" without interpreting prose.

## The ones that do not belong in the template

Personal diagnostic tools —measuring time, listing slow tests— have no CI consumer. They stay out: a script nobody runs rots.

## Workflows

Workflows are not scripts: they are the CI skeleton. Each project defines its own; the table of patterns and triggers lives in [Gates → CI](metodo.html#ci).

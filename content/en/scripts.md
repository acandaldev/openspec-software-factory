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

It currently lives in this site's repository, not in the reference implementation: it is a pending requirement for the template.

```bash
node scripts/check-secrets.mjs   # fails with the finding and its line
```

The public list (`data/forbidden.json`) only holds examples. The terms for the concrete project are read from `~/.config/openspec-software-factory/forbidden.json` (or `OPENSPEC_FORBIDDEN_FILE`), outside the repository: the gate does not publish the data it watches for.

### `--plan`

Turns tasks into something a machine can query:

```json
{ "id": "9.18b", "block": 9, "level": "NORMAL", "state": "pending", "deps": ["9.18a"] }
```

It answers "what is next?" without interpreting prose.

## The ones that do not belong in the template

Personal diagnostic tools —measuring time, listing slow tests— have no CI consumer. They stay out: a script nobody runs rots.

## Workflows

Workflows are not scripts: they are the CI skeleton. Gates on PR, pre deploy on `main`, manual production and a weekly cron for documentation.

| Workflow | Trigger |
|---|---|
| Backend / Front | Pull request |
| Docs | Push, PR and cron |
| Pre-deploy | Push to `main` |
| Production | Manual |

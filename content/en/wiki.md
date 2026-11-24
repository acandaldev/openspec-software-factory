# The wiki layer: optional, not a requirement

The LLM wiki pattern is powerful: immutable sources, generated pages, index, log and lint. But not every project needs a wiki, and a project with good documentation can get worse if you add another layer.

## When it makes sense

- You accumulate **external research**: papers, articles, client notes, comparisons.
- You need **traceability to the source**: which document backs each claim.
- Knowledge **crosses topics** and you want the connections preserved.
- Several people or sessions consult the same material and nobody wants to rebuild it.

## When it does not

- Your documentation is already operational: contract, runbooks, state. Adding `raw/` would be one more folder to maintain.
- Knowledge changes daily and the wiki would go stale.
- Nobody reads it: a wiki without readers is context debt.

## The three layers

```
raw/       immutable sources. The agent reads, never writes.
wiki/      generated pages: concepts, entities, sources, comparisons.
schema     AGENTS.md with conventions and workflows.
```

And two special files: `index.md` (catalogue read first) and `log.md` (append-only chronological record).

## The operations

- **Ingest**: a source comes in, is summarised, connected to what already exists and logged.
- **Query**: read the index, pick the relevant pages and synthesise with citations.
- **Lint**: contradictions, orphan pages, broken links and stale claims.

## The part worth copying

The **deterministic** lint: broken links, pages with no inbound links, incomplete frontmatter, sources that no longer exist. A script checks it and CI fails.

Semantic lint —"these two pages contradict each other"— is useful as manual review, but not as a gate: a model that is wrong must not block a merge.

## Relation to `docs/`

They are not the same:

| `docs/` | `wiki/` |
|---|---|
| Project documentation | Accumulated knowledge |
| Contract, runbooks, state | Concepts, sources, comparisons |
| Written by hand | Maintained by the agent |
| Expires by date | Expires by new source |

If the project already has mature `docs/`, the wiki starts as a **research folder**, not as a second documentation.

## Verdict

For a running product: **no**. For the template: **yes, as an optional layer**, documented and with deterministic lint. Let each project decide whether to turn it on.

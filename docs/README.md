# Project Knowledge Base

This directory holds durable project knowledge that remains useful across tasks and sessions. It does not hold implementation plans, investigation logs, temporary TODOs, task handoffs, or one-off QA results.

## Knowledge Areas

Create a topic directory and document only when there is verified, maintainable information to record. Do not create empty placeholders for planned documentation.

| Area | Location | Responsibility |
|---|---|---|
| Product | `docs/product/` | What the product is, why it exists, durable requirements, feature definitions, and acceptance criteria |
| Design | `docs/design/` | How the product should appear and behave, including interaction, responsive, accessibility, and UI-state rules |
| Engineering | `docs/engineering/` | How the system works technically: architecture, contracts, data model, authentication, deployment, and engineering constraints |
| Decisions | `docs/decisions/` | Significant product, design, or engineering decisions with rationale and trade-offs; not routine change logs |

These are target locations, not evidence that documents already exist. Add a document only when its subject has an established source of truth and an owner can keep it current.

## Context Routing

Use progressive context rather than reading everything:

- Product behavior: relevant `docs/product/` material, then affected implementation.
- UI behavior: relevant product and `docs/design/` material, then affected frontend implementation.
- Architecture, data, authentication, API, or deployment: relevant `docs/engineering/` material, then actual code and configuration.
- Rationale for a consequential choice: relevant record under `docs/decisions/`, then the current implementation.

If a referenced area or document does not exist, do not infer its contents. Inspect code and configuration and report any uncertainty that affects the task.

## Source-of-Truth Boundaries

- `AGENTS.md` is the repository operating guide and context router.
- `docs/` contains durable project knowledge.
- Code and configuration are the final evidence of current implementation behavior.
- A future task workspace may contain task-specific plans and execution records; no such repository structure is defined yet.
- Conversation is temporary context and must be checked against the repository.

When documentation and implementation differ, verify the difference and report it. Update durable documentation when an authorized change alters the documented contract or behavior.

## Reconnaissance

`docs/reconnaissance/repository-reconnaissance.md` is a point-in-time baseline and investigation artifact, not a permanent authoritative knowledge source. Use it to locate known areas and unknowns, then verify relevant claims against the current repository. Promote durable, confirmed information into the appropriate knowledge area when that documentation is intentionally created. The baseline may later be archived or removed after useful knowledge has been promoted.

## Content Rules

- Keep durable project knowledge separate from task-specific context.
- State whether information is confirmed, inferred, or externally unverified when that distinction matters.
- Link to relevant implementation or configuration instead of duplicating large inventories.
- Do not record secrets, credentials, `.env` values, connection strings, personal identifying information, or private/internal data. Environment variables may be documented by name and purpose only.

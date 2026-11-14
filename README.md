# Portal de pedidos — My Bakery

Portal de pedidos online de la panadería artesanal My Bakery (Barcelona, EST 2020).
Cliente recoge en tienda. Pago al recoger en el MVP; pago online en fases posteriores.

## Identidad y design system

La identidad de marca vive en [`brand/`](./brand). La fuente de verdad visual es `brand/BRAND.md`, `brand/DESIGN.md` y `brand/tokens.json`. La hoja de marca está en `brand/brand-sheet.html`.

## Stack

Next.js 15 · TypeScript · Tailwind 4 · Supabase · pnpm · Vercel. Detalle en [`AGENTS.md`](./AGENTS.md) y [`docs/adr/0001-stack.md`](./docs/adr/0001-stack.md).

## Requisitos

- Node.js 24 (ver `.nvmrc`)
- pnpm 11+
- Supabase CLI (opcional, para desarrollo local)

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # rellenar variables
pnpm dev
```

## Ramas y PRs

Regla: **nada directo a `develop` ni a `main`.** Todo cambio entra por PR.

1. `git switch develop && git pull --ff-only`
2. `git switch -c feat/<issue>-<slug>`
3. Commits en la rama
4. `git push -u origin <rama>`
5. PR con base `develop`
6. CI verde + revisión
7. Merge y borrar la rama

- `main` solo recibe `release/vX.Y.Z` al final del proyecto.
- `pr-guard.yml` valida la dirección de la PR.
- Activa los hooks que bloquean commits/pushes en ramas protegidas:

```bash
pnpm setup:hooks
```

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest (unit) |
| `pnpm test:e2e` | Playwright |
| `pnpm openspec:validate` | Validar specs de OpenSpec |
| `pnpm design:lint` | Validar `brand/DESIGN.md` con el linter oficial |
| `pnpm design:tailwind` | Exportar tokens a Tailwind |
| `pnpm design:dtcg` | Exportar tokens a DTCG |
| `pnpm stitch:serve` | Preview de pantallas Stitch en :3001 |
| `pnpm stitch:open` | Abrir el proyecto en Stitch |

## Trabajo con IA

Este repo está configurado para OpenCode/OpenSpec:

- `AGENTS.md` — contrato del agente (stack, comandos, invariantes, DoD).
- `.opencode/agents/` — subagentes (spec-writer, db-architect, frontend-builder, security-reviewer, code-reviewer).
- `.opencode/skills/mybakery-brand/` — skill de marca.
- `openspec/` — specs y cambios (fuente de verdad del trabajo).

Flujo: `/openspec-explore` → `/openspec-propose` → `/openspec-apply-change` → `/openspec-archive-change`.

## Estructura

Ver `AGENTS.md` § Estructura.

## Licencia

Propietaria. © 2026 Brian Studio System. Todos los derechos reservados.

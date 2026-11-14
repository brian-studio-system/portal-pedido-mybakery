# AI Activity Log

Registro cronológico de sesiones asistidas por IA. Se añade una entrada al final;
nunca se sobrescribe ni se borra historial. No registrar secretos, tokens ni datos
personales.

## Plantilla

```md
## YYYY-MM-DD — Título de la sesión

- **Agente/modelo:**
- **Objetivo:**
- **Instrucciones recibidas:**
- **Análisis y actividades:**
- **Archivos inspeccionados:**
- **Archivos creados/modificados:**
- **Comandos y tests ejecutados:**
- **Errores y resolución:**
- **Resultados:**
- **Pendiente / siguientes pasos:**
```

## 2026-11-14 — M0: bootstrap del repo y del sistema de trabajo con IA

- **Agente/modelo:** DeepSeek V4.1 Flash (OpenCode).
- **Objetivo:** crear el repositorio, la gobernanza y el flujo spec-driven antes
  de escribir código de producto.
- **Instrucciones recibidas:** usar pnpm como empaquetador, `npx` para skills,
  repo en la organización `brian-studio-system`, GitHub Project con hitos, skills
  versionadas en el repo, CI desde M0.
- **Análisis y actividades:**
  - Se verificó el entorno: git 2.56, gh autenticado como `BrianStiv`, Node 24,
    pnpm 11.9, org `brian-studio-system` disponible.
  - Se creó la estructura de gobernanza (AGENTS.md, opencode.jsonc, subagentes,
    skill de marca, docs, CI, plantillas).
  - Se inicializó OpenSpec 2.0 con `--tools opencode`.
  - Se instalaron 8 skills project-level con `npx skills add` + `skills-lock.json`.
  - Se creó el repo privado y se configuró el GitHub Project con campos, labels
    e hitos M0–M6.
- **Archivos inspeccionados:** `brand/BRAND.md`, `brand/DESIGN.md`,
  `brand/tokens.json`, repos de referencia de la org `IA-P1-BCN`
  (`customer-segmentation-multiclass`, `g1-python-crud-api`, `g2-python-crud-api`).
- **Archivos creados/modificados:** `AGENTS.md`, `README.md`, `opencode.jsonc`,
  `.opencode/agents/*` (5), `.opencode/skills/mybakery-brand/SKILL.md`,
  `openspec/config.yaml`, `openspec/project.md`, `.github/workflows/ci.yml`,
  plantillas de PR/issues, `docs/adr/0001-stack.md`, `docs/decisions.md`,
  `.gitignore`, `.editorconfig`, `.nvmrc`, `.env.example`, `skills-lock.json`.
- **Comandos y tests ejecutados:** `git init -b main`, `pnpm add -g
  @fission-ai/openspec`, `openspec init --tools opencode`,
  `npx skills add …` (8), `openspec validate --all` (sin cambios aún: exit 0),
  `gh repo create`, `gh project create`, `gh project field-create` (3 campos),
  `gh label create`, `gh api …/milestones`.
- **Errores y resolución:** el primer intento de crear labels falló por el
  delimitador `:` en nombres como `type:feat`; se corrigió usando `|`. El primer
  `gh repo create --push` falló porque no había commits; se hizo commit previo.
- **Resultados:** repo privado publicado, Project "My Bakery — MVP" con campos
  `Priority`/`Area`/`Size`, 14 labels y 7 hitos. Commit inicial `c3062d6`.
- **Pendiente / siguientes pasos:** M1 scaffold (Next.js + Tailwind + tokens) y
  el primer cambio de OpenSpec.

## 2026-11-14 — Gobernanza y trazabilidad (adopción desde IA-P1-BCN)

- **Agente/modelo:** DeepSeek V4.1 Flash (OpenCode).
- **Objetivo:** incorporar las mejores prácticas de los repos de referencia de la
  organización: gobernanza explícita, logs de IA, skills propias de revisión y
  verificación, y revisión IA en CI.
- **Instrucciones recibidas:** "aplicar eso a este repo".
- **Análisis y actividades:** se revisaron los tres repos con configuración de
  agentes y se sintetizaron sus patrones (no se copió ninguno entero).
- **Archivos inspeccionados:** `AGENTS.md`, `.opencode/skills/*`, `docs/ai-log/*`,
  `docs/opencode.md`, `.github/workflows/ai-review.yml` de los repos de referencia.
- **Archivos creados/modificados:** `AGENTS.md` (gobernanza + trazabilidad + git),
  `docs/ai-usage/DECISION_LOG.md`, `docs/ai-usage/AI_ACTIVITY_LOG.md`,
  `.github/PULL_REQUEST_TEMPLATE.md`, skills `mybakery-review` y `mybakery-verify`.
- **Comandos y tests ejecutados:** `openspec validate --all` (sin cambios todavía: exit 0).
- **Errores y resolución:** ninguno.
- **Resultados:** gobernanza, logs y skills de revisión/verificación añadidas.
- **Pendiente / siguientes pasos:** `docs/SPEC_WORKFLOW.md`, revisión IA en CI,
  plantilla de cambio y P0 de agentes.

## 2026-11-14 — P0: agentes de trazabilidad y pruebas

- **Agente/modelo:** DeepSeek V4.1 Flash (OpenCode).
- **Objetivo:** aplicar los patrones de mayor valor detectados en la organización
  `IA-P1-BCN` sin copiar repos enteros.
- **Instrucciones recibidas:** "okey perfecto" tras la propuesta P0.
- **Análisis y actividades:** se revisaron 57 repos de la org (8.124 archivos) y
  se seleccionaron los patrones de `P1_Brian_Data_analysis`,
  `zapateria-paso-firme-g2` y `APIResto_Backend`.
- **Archivos inspeccionados:** árboles de las 57 repos; AGENTS.md, agentes,
  comandos, workflows y bitácoras de los repos de referencia.
- **Archivos creados/modificados:** `.opencode/agents/ai-scribe.md`,
  `.opencode/agents/test-designer.md`, `.opencode/agents/security-reviewer.md`
  (checklist concreto), cabecera `SCOPE` en los 7 agentes, `docs/ontology.md`,
  `AGENTS.md` (convención `<<PENDIENTE>>`), `opencode.jsonc` (permisos de los
  nuevos subagentes).
- **Comandos y tests ejecutados:** `python3 -c json.load(opencode.jsonc)`,
  `openspec validate --all`, `git diff --check`.
- **Errores y resolución:** ninguno.
- **Resultados:** 7 subagentes con ámbito acotado, vocabulario de dominio único
  y convención anti-invención.
- **Pendiente / siguientes pasos:** P1 (`.agents/` como fuente, `SPEC_WORKFLOW`,
  `CONTRIBUTING`, `CLAUDE.md`, revisión IA en CI).

## 2026-11-14 — Backlog M0–M6 y M1 Scaffold

- **Agente/modelo:** DeepSeek V4.1 Flash (OpenCode).
- **Objetivo:** crear el backlog completo con historias y sub-issues por hito, y
  andamiar Next.js 16 con Tailwind 4, tokens de marca y layout base.
- **Instrucciones recibidas:** crear las 68 issues, M0 cerrada como historial y
  autorizar el push.
- **Análisis y actividades:**
  - Se recrearon los hitos con el orden definitivo (M1 Scaffold, M2 Auth, …).
  - Se añadieron labels `story`, `task`, `prioridad:P1/P2/P3`, `bloqueado`.
  - Se crearon 67 issues (14 historias + 53 tareas) con sub-issues y Project.
  - Se implementó el scaffold: Next 16.4.6, React 19.3.1, Tailwind 4.3.5,
    tokens como CSS vars, `next/font`, Header/Footer/Container, home, carta y
    cuenta placeholder, `formatPrice` + tests.
- **Archivos inspeccionados:** `AGENTS.md`, `brand/tokens.json`, `brand/DESIGN.md`.
- **Archivos creados/modificados:** `package.json`, `pnpm-lock.yaml`,
  `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`,
  `vitest.config.mts`, `src/app/*`, `src/components/layout/*`, `src/lib/money*`,
  `public/my-bakery-logo.svg`, `src/app/icon.svg`,
  `scripts/backlog/*`, `.github/workflows/ci.yml`, `.gitignore`.
- **Comandos y tests ejecutados:** `pnpm install`, `pnpm lint`, `pnpm typecheck`,
  `pnpm test` (3 tests), `pnpm build`, `openspec validate --all --strict`,
  `gh issue create`, `gh project item-add`, capturas con Firefox headless.
- **Errores y resolución:** faltaba la label `type:test` y el primer seeder
  abortó; se hizo idempotente. El límite de GraphQL se agotó al añadir items al
  Project; las 12 últimas issues se crearon y enlazaron por REST y quedan
  pendientes de sincronizar en el Project.
- **Resultados:** app arranca, build en verde y capturas con la paleta correcta
  (paper/ink). 67 issues creadas.
- **Pendiente / siguientes pasos:** añadir las 12 issues restantes al Project,
  push, verificar CI en remoto y empezar M2 (Auth).

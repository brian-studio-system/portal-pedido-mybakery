# Portal de pedidos — My Bakery

Portal de pedidos online de la panadería artesanal My Bakery (Barcelona, EST 2020).
Cliente recoge en tienda. Pago al recoger en el MVP; pago online en fases posteriores.

## Stack (versiones fijas)

- Next.js 15 (App Router) · TypeScript strict · React 19
- Tailwind CSS 4 + tokens de marca (`brand/tokens.json`)
- Supabase (Auth, Postgres, Storage) · `@supabase/ssr`
- Validación: Zod · Formularios: React Hook Form
- Email: Resend · Tests: Vitest + Playwright
- Package manager: **pnpm** (nunca npm/yarn)
- Deploy: Vercel

## Comandos

```bash
pnpm install                 # instalar dependencias
pnpm dev                     # servidor de desarrollo
pnpm build                   # build de producción
pnpm lint                    # eslint
pnpm typecheck               # tsc --noEmit
pnpm test                    # vitest (unit)
pnpm test:e2e                # playwright
pnpm supabase:start          # supabase local
pnpm supabase:db:push        # aplicar migraciones (confirmar antes)
pnpm openspec:validate       # openspec validate --strict
```

## Estructura

```
src/
├── app/                     # rutas (App Router)
│   ├── (shop)/              # catálogo, ficha, carrito, checkout
│   ├── (account)/           # login, perfil, pedidos del cliente
│   └── admin/               # panel admin (protegido)
├── components/              # UI (usa tokens de marca)
├── lib/                     # supabase, validaciones, helpers
└── types/
supabase/
├── migrations/              # SQL versionado
└── seed.sql
openspec/                    # specs y cambios (fuente de verdad del trabajo)
brand/                       # identidad y design system
```

## Marca (obligatorio antes de tocar UI)

Lee `brand/BRAND.md`, `brand/DESIGN.md` y `brand/tokens.json`. Usa solo los tokens definidos. Prohibido: colores, fuentes o radios fuera de la paleta. La skill `mybakery-brand` carga estas reglas automáticamente.

## Diseño con Stitch

- Skill `/stitch` instalada en `.agents/skills/stitch/`.
- Proyecto fijado en `.stitch.json`; no pasar `--project` en cada comando.
- `pnpm stitch:serve` → preview de pantallas en `http://127.0.0.1:3001`.
- `pnpm stitch:open` → abre el canvas en el navegador.
- `pnpm design:lint` → valida `brand/DESIGN.md`; se exige 0 errores y 0 warnings.
- `pnpm design:tailwind` y `pnpm design:dtcg` → exportan tokens.
- Los prototipos de `design/stitch/` son referencia visual, no código fuente.
- No se implementa UI nueva sin pantalla aprobada o spec; siempre con tokens.

## UI con shadcn

- Los primitivos viven en `src/components/ui/`; los componentes de producto, en `src/components/`.
- Usa los tokens semánticos de shadcn (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `ring-ring`, `rounded-md`). Nunca colores hex sueltos.
- El tema ya está mapeado a la marca en `src/app/globals.css`. **No ejecutes `shadcn init` otra vez** ni cambies el `style`/`base` de `components.json`.
- Antes de añadir un componente: `pnpm ui:docs <componente>` o `pnpm ui:search`. Después: `pnpm ui:add <componente>`.
- Añade solo los componentes que uses. No instales los 50+.
- Formularios: `Field`/`FieldGroup` + React Hook Form + Zod.
- Carrito móvil: `Sheet`. Tablas de admin: `Table`.
- Personaliza variantes en el propio componente (`button.tsx`), no repartiendo overrides por toda la app.
- Prohibido dark mode y AI Elements.

## Supabase

- **MCP de Supabase** en `opencode.jsonc` (`mcp.servers.supabase`). Úsalo para
  inspeccionar tablas, migraciones, advisors, logs, tipos y docs.
- **CLI como fuente de verdad de migraciones:** `supabase/migrations/*.sql`
  versionadas. `pnpm db:push` aplica al proyecto cloud; `pnpm db:types` genera
  `src/types/database.ts`.
- `supabase/config.toml` se commitea; `supabase/.temp/` no.
- No ejecutes SQL ad-hoc que cambie el esquema: conviértelo en migración.
- `service_role` solo en servidor y en `.env.local`. Nunca en el cliente ni en
  el repo.
- Después de cada migración: `get_advisors` (MCP) y revisar RLS.
- Para auditorías o diagnóstico, usa el MCP en modo `read_only=true`.
- Auth: magic link; rol en `profiles.role`; `is_admin()` con `security definer`.
- Comandos: `pnpm db:link`, `pnpm db:push`, `pnpm db:types`, `pnpm db:diff`,
  `pnpm db:start`, `pnpm db:stop`.

## Invariantes (no negociables)

1. **RLS activo en todas las tablas** de Supabase.
2. **El precio se recalcula en servidor**; nunca se confía en el carrito del cliente.
3. **`service_role` solo en servidor**; nunca en el cliente ni en el bundle.
4. **El pedido es idempotente** (evitar duplicados al doble clic).
5. **Rate limit** en checkout y login.
6. **AA mínimo 4.5:1** en texto; foco visible siempre.
7. **Respetar `prefers-reduced-motion`**.
8. **No transmitir estado solo por color**.

## Gobernanza del agente

El agente es un guía técnico y asistente colaborativo, no un decisor autónomo:
analiza el contexto antes de proponer, explica con evidencia, presenta
alternativas con ventajas e inconvenientes, implementa solo el alcance aprobado,
verifica y reporta.

**Requiere aprobación humana explícita:**

- Cambiar objetivos, alcance o criterios de aceptación.
- Modificar el esquema de datos o aplicar migraciones.
- Cambiar auth, roles o políticas RLS.
- Cualquier cosa relacionada con pagos.
- Añadir dependencias, MCPs o skills nuevas.
- Commit, push, merge, rebase o cualquier comando git destructivo.
- Deploy a producción.

**Permitido en autonomía** (rutina, no destructivo): leer e inspeccionar archivos,
explorar el repositorio, ejecutar tests y linters, diagnosticar errores, preparar
propuestas y planes, y editar dentro del alcance aprobado.

**Comunicación:** español por defecto; código, nombres e identificadores en inglés.
Explica el porqué, no solo el qué.

**Marcadores:** si falta un dato, una regla de negocio o una decisión, escribe
`<<PENDIENTE>>` y pregunta. Nunca inventes cifras, columnas, reglas ni resultados
de tests. El vocabulario del dominio está en `docs/ontology.md`; úsalo sin
sinónimos.

## Trazabilidad de IA

Todo trabajo significativo asistido por IA debe ser rastreable: qué se pidió, qué
cambió, por qué y quién lo aprobó.

- `docs/ai-usage/DECISION_LOG.md` — decisiones de proyecto con estado
  `Proposed/Approved/Rejected`. **Solo un humano puede cambiar el estado**; el
  agente puede proponer y documentar, nunca aprobar en nombre del equipo.
- `docs/ai-usage/AI_ACTIVITY_LOG.md` — registro cronológico de sesiones: objetivo,
  instrucciones, archivos inspeccionados/creados/modificados, comandos y tests
  ejecutados, errores y resolución, resultados y pendientes.

Reglas: preservar el historial (nunca sobrescribir), describir hechos reales
(nunca inventar métricas, tests o aprobaciones), no registrar secretos ni datos
personales, y anotar el estado y los siguientes pasos si el trabajo se interrumpe.

## Flujo de trabajo

Spec-driven con OpenSpec. **Nada de código sin un cambio aprobado**, salvo `chore`.

```
/openspec-explore  →  /openspec-propose  →  /openspec-apply-change  →  /openspec-archive-change
```

Cada cambio = una rama = un PR. `openspec validate --strict` debe pasar en CI.

## Definition of Done

- [ ] Spec aprobada y archivada
- [ ] Código implementado y tipado (sin `any` sin justificar)
- [ ] Tests unitarios para lógica de negocio (carrito, precios, stock)
- [ ] E2E para el flujo de checkout
- [ ] Lint y typecheck en verde
- [ ] RLS verificado (test con usuario no autorizado)
- [ ] Revisión de seguridad (`security-reviewer`)
- [ ] Revisión de código (`code-reviewer`)
- [ ] Accesible (teclado, foco, contraste)
- [ ] Móvil verificado

## Flujo de ramas (obligatorio)

Regla dura: **nunca se commitea ni se pushea directo a `main` ni a `develop`.**
Todo cambio entra por PR hacia `develop`.

1. `git switch develop && git pull --ff-only`
2. `git switch -c <tipo>/<issue>-<slug>` (ej. `feat/12-auth-magic-link`)
3. Commits en la rama (convencionales)
4. `git push -u origin <rama>`
5. PR con base `develop` (nunca `main`)
6. CI verde + revisión
7. Merge a `develop` y borrar la rama

- `main` solo recibe `release/vX.Y.Z` al final del proyecto.
- Ramas: `feat/…`, `fix/…`, `chore/…`, `docs/…`. Una tarea = una rama = un PR.
- Hooks `pre-commit` y `pre-push` bloquean commits/pushes en `main` y `develop`;
  se activan con `pnpm setup:hooks`.
- `pr-guard.yml` valida en CI que la PR vaya en la dirección correcta.
- Excepción solo para setup/release: `ALLOW_PROTECTED_COMMIT=1` y
  `ALLOW_PROTECTED_PUSH=1`.
- Commits convencionales: `feat(cart): añadir stepper de cantidad`.
- PR ≤ 400 líneas. Plantilla en `.github/PULL_REQUEST_TEMPLATE.md`.
- CI en verde obligatorio antes de mergear.
- **El agente no commitea, pushea, mergea ni reescribe historia sin autorización explícita.**
- Antes de empezar: `git status` y preservar cambios no relacionados.

## Cuándo parar y preguntar

- Cambios de esquema o migraciones.
- Cambios en auth, roles o RLS.
- Cualquier cosa relacionada con pagos.
- Deploy a producción.
- Añadir una dependencia nueva.
- Cambiar tokens de marca o el design system.

## Referencias

- Identidad: `brand/BRAND.md`
- Design system: `brand/DESIGN.md`
- Tokens: `brand/tokens.json`
- Decisiones: `docs/decisions.md` y `docs/adr/`
- Hoja de marca: `brand/brand-sheet.html`

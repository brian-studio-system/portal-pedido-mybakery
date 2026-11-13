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

## Invariantes (no negociables)

1. **RLS activo en todas las tablas** de Supabase.
2. **El precio se recalcula en servidor**; nunca se confía en el carrito del cliente.
3. **`service_role` solo en servidor**; nunca en el cliente ni en el bundle.
4. **El pedido es idempotente** (evitar duplicados al doble clic).
5. **Rate limit** en checkout y login.
6. **AA mínimo 4.5:1** en texto; foco visible siempre.
7. **Respetar `prefers-reduced-motion`**.
8. **No transmitir estado solo por color**.

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

## Convenciones git

- Ramas: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Commits convencionales: `feat(cart): añadir stepper de cantidad`.
- PR ≤ 400 líneas. Plantilla en `.github/PULL_REQUEST_TEMPLATE.md`.
- `main` protegida: requiere CI verde y 1 aprobación.

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

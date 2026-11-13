# ADR-0001: Stack del MVP

**Estado:** Aceptado
**Fecha:** 2026-11-14

## Contexto

Portal de pedidos online para una panadería artesanal de barrio (My Bakery, Barcelona). Cliente recoge en tienda. MVP sin pago online.

## Decisión

- **Frontend:** Next.js 15 (App Router) + TypeScript strict + React 19.
- **Estilos:** Tailwind CSS 4 con tokens de `brand/tokens.json`.
- **Backend/DB:** Supabase (Postgres + Auth + Storage) con `@supabase/ssr`.
- **Validación:** Zod. **Formularios:** React Hook Form.
- **Email:** Resend. **Tests:** Vitest (unit) + Playwright (E2E).
- **Package manager:** pnpm.
- **Deploy:** Vercel.

## Consecuencias

- SSR y server components por defecto; client solo con interactividad.
- RLS en todas las tablas; `service_role` solo en server routes.
- Pagos fuera del MVP; el checkout crea un pedido en estado `pending`.
- Auth por magic link; roles `user`/`admin` en `profiles.role`.

## Alternativas descartadas

- Vite + React: menos integración con SSR y Supabase SSR helpers.
- Firebase: menos control sobre RLS y migraciones SQL.
- Pago online en MVP: añade fricción y superficie de ataque antes de validar demanda.

# Decisiones de arquitectura

Registro de decisiones técnicas y de producto. Las ADR completas están en `docs/adr/`.

## D-001 — Magic link para todos los usuarios

**Decisión:** Auth por magic link (Supabase `signInWithOtp`), rol en `profiles.role` validado en servidor. No `user_metadata`.
**Motivo:** menos fricción en móvil, sin gestión de contraseñas, menor superficie de ataque.
**Pendiente:** configurar SMTP (Resend) en Supabase Auth antes de producción.

## D-002 — Pago al recoger en el MVP

**Decisión:** El checkout crea un pedido en estado `pending` y notifica al admin. Sin pasarela de pago.
**Motivo:** validar demanda sin fricción ni comisiones.
**Post-MVP:** Stripe (tarjeta + Bizum) o Redsys.

## D-003 — Solo productos en esta fase

**Decisión:** Catálogo de productos primero. El horario se prepara como tablas base (`business_hours`, `pickup_slots`) pero sin UI ni lógica de recogida.
**Motivo:** reducir alcance del MVP.

## D-009 — Supabase con MCP + CLI

**Decisión:** conectar el proyecto Supabase al agente por MCP (project-scoped) y
usar el CLI como fuente de verdad de las migraciones; las skills oficiales
`supabase` y `supabase-postgres-best-practices` ya están instaladas.
**Motivo:** el MCP da inspección, advisors, tipos y logs en vivo; el CLI mantiene
migraciones versionadas y reproducibles. El plugin oficial se descarta porque
duplicaría las skills ya instaladas.
**Aplicación:** `mcp.servers.supabase` en `opencode.jsonc`;
`supabase/config.toml` versionado; scripts `db:*`.
**Seguridad:** MCP acotado al proyecto, aprobación manual de SQL, `read_only`
para auditorías, `service_role` solo en servidor y `.env.local`.

## D-008 — Stack de UI y formularios

**Decisión:** Tailwind 4 + shadcn/ui (Radix) + Lucide como capa visual; Zod 4 +
React Hook Form 7 + `@hookform/resolvers` para formularios en M2 y M5; Sonner
para toasts en M4 y M5; Motion solo después del MVP y solo si una interacción
concreta lo justifica.
**Motivo:** Zod y RHF son la base de validación compartida cliente/servidor;
Sonner resuelve feedback accesible sin montar toasts propios; Motion es el más
pesado y el design system ya cubre el motion básico con CSS.
**Aplicación:** dependencias en M2/M4/M5; iconos Lucide con stroke 1.5–2;
toasts con tokens de marca, no con el tema por defecto.
**Límites:** no instalar Motion antes del MVP; no usar un toast por cada acción;
no mezclar sets de iconos.

## D-007 — shadcn/ui como capa de componentes

**Decisión:** adoptar shadcn/ui (base Radix, CSS variables) como capa de
componentes, con los tokens semánticos mapeados a la marca. No se usa el tema
neutro por defecto.
**Motivo:** componentes accesibles con código abierto, editables y compatibles
con Tailwind 4, sin atarse a una librería cerrada.
**Aplicación:** `components.json` + `src/components/ui/` + mapeo en
`src/app/globals.css`; skill oficial y MCP de shadcn; CLI vía `pnpm ui:*`.
**Límites:** sin dark mode, sin AI Elements, sin instalar todos los componentes.
No se vuelve a ejecutar `shadcn init`.

## D-006 — Flujo de ramas obligatorio

**Decisión:** ningún commit ni push directo a `develop` o `main`. Todo cambio
sale de `develop` en una rama `feat|fix|chore|docs/<issue>-<slug>` y entra por PR
hacia `develop`. `main` solo recibe `release/vX.Y.Z`.
**Motivo:** evitar integraciones sin revisión y mantener `develop` siempre verde.
**Aplicación:** hooks `pre-commit` y `pre-push` + workflow `pr-guard.yml` + regla
en `AGENTS.md`. Excepción explícita con `ALLOW_PROTECTED_COMMIT/PUSH=1` solo para
setup o release.

## D-005 — Assets de design-taste-frontend podados

**Decisión:** Se eliminó `assets/` (37 MB de demos) de la copia en repo de la skill. Se conserva SKILL.md, library, references y scripts.
**Motivo:** mantener el repo ágil; los assets son demos/showcase no necesarios para una panadería.
**Restauración:** `npx skills install` (experimental) usa `skills-lock.json`.

## D-004 — Subagentes con permisos mínimos

**Decisión:** Cada subagente tiene permisos acotados por path y acción. Solo lectura para reviewers.
**Motivo:** evitar cambios accidentales fuera de su ámbito.

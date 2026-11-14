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

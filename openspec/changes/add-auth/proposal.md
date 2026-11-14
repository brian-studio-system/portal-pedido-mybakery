# Proposal

## Why

El portal necesita identificar al cliente para guardar sus pedidos y al admin
para gestionarlos. Sin autenticación no hay historial, ni panel, ni datos
protegidos: M2 bloquea el resto del MVP.

## What Changes

- Login sin contraseña con **magic link** de Supabase (`signInWithOtp`).
- Tabla `profiles` (`id`, `email`, `role`, `created_at`) creada por trigger desde
  `auth.users`, con rol `user` por defecto.
- Roles `user` y `admin` validados en servidor con `is_admin()` y RLS.
- Rutas `/login`, `/auth/callback`, `/cuenta` y `/admin`, con guards.
- Middleware de sesión con `@supabase/ssr`.
- Script y documentación para promover un usuario a admin.
- Validación de formularios con Zod + React Hook Form; componentes `label`,
  `field` y `alert` de shadcn.

**Fuera de alcance:** OAuth social, 2FA, recuperación de contraseña, edición de
perfil, pagos y cualquier lógica de pedidos.

## Capabilities

### New Capabilities

- `user-auth`: identificación por magic link, sesión persistente, roles y
  protección de rutas.

### Modified Capabilities

Ninguna: no existen specs previas.

## Impact

- **Código:** `src/app/login`, `src/app/auth/callback`, `src/app/cuenta`,
  `src/app/admin`, `src/lib/supabase/*`, `src/middleware.ts`.
- **Dependencias:** `@supabase/supabase-js`, `@supabase/ssr`, `zod`,
  `react-hook-form`, `@hookform/resolvers`; componentes `label`, `field` y
  `alert`.
- **Datos:** migración de `profiles`, trigger, RLS e `is_admin()`.
- **Seguridad:** `service_role` solo en servidor; el rol se lee de
  `profiles.role`, nunca de `user_metadata`.
- **Entorno:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y
  `SUPABASE_SERVICE_ROLE_KEY` (solo servidor).

## Success criteria

- Un usuario completa el login con magic link en dos pasos (email → enlace).
- Un `user` recibe redirect/404 en `/admin`; un `admin` accede.
- Un usuario no puede leer ni modificar el perfil de otro (test de RLS).
- `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm build` en verde.

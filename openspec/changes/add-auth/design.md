# Design

## Context

La app ya tiene Next.js 16 (App Router), Tailwind 4, shadcn/ui y componentes de
marca. No existe autenticación ni tablas de usuario. Ver `proposal.md` para la
motivación y `specs/user-auth/spec.md` para el contrato de comportamiento.

Restricciones vigentes:

- `service_role` solo puede vivir en servidor.
- El rol nunca puede venir de `user_metadata`.
- La marca es mobile-first y light-only.
- El repo trabaja con PRs y CI; no hay entorno de staging todavía.

## Goals / Non-Goals

**Goals:**

- Magic link con Supabase Auth y sesión SSR por cookies.
- `profiles` con rol `user`/`admin` y RLS verificable.
- Guards en servidor para `/cuenta` y `/admin`.
- Bootstrap de admin reproducible y documentado.
- Base de formularios reutilizable (RHF + Zod + shadcn `Field`).

**Non-Goals:**

- OAuth social, 2FA, contraseñas y recuperación.
- Edición de perfil y borrado de cuenta.
- Invitaciones, equipos o roles adicionales.
- Pagos y datos de pedidos.

## Decisions

### 1. Magic link de Supabase Auth

Usar `signInWithOtp` en lugar de generar tokens propios.

- **Por qué:** Supabase ya resuelve generación, expiración, un solo uso y
  entrega por email; reduce superficie de ataque.
- **Alternativas:** tokens propios (más código y riesgo), email + contraseña
  (gestión de hashes y resets).

### 2. Sesión SSR con `@supabase/ssr`

Cookies `httpOnly` gestionadas por el cliente SSR y refresco en middleware.

- **Por qué:** los server components y server actions necesitan la sesión sin
  exponer tokens en JS; evita parpadeos de auth.
- **Alternativas:** sesión solo en cliente (peor para SSR y guards), JWT propio
  (más trabajo y sin ventaja aquí).

### 3. Rol en `profiles.role` + `is_admin()` con `security definer`

El rol se lee de una tabla protegida por RLS y se comprueba con una función SQL
`security definer`.

- **Por qué:** `user_metadata` es editable por el usuario; los claims del JWT
  requieren hooks personalizados. `profiles` es auditable y testeable.
- **Alternativas:** `user_metadata.role` (inseguro), claim en JWT (más
  complejidad y sincronización).

### 4. Perfil creado por trigger en `auth.users`

Un trigger `after insert` crea el perfil con `role = 'user'`.

- **Por qué:** evita carreras y perfiles huérfanos si el cliente falla tras el
  signup.
- **Alternativas:** upsert desde la app (puede fallar o duplicarse).

### 5. Guards en servidor, no solo en cliente

El middleware refresca la sesión; las páginas y server actions comprueban rol.

- **Por qué:** un guard de cliente se salta con DevTools.
- **Alternativas:** solo middleware (no cubre server actions), solo cliente
  (inseguro).

### 6. Bootstrap de admin fuera del navegador

Script documentado con `service_role` o SQL en el panel de Supabase.

- **Por qué:** evita una ruta pública de promoción y un "primer usuario admin"
  explotable.
- **Alternativas:** primer usuario admin (riesgo si se registra antes), panel de
  admin para roles (fase posterior).

### 7. Formularios con RHF + Zod + shadcn `Field`

`zodResolver` en cliente y `safeParse` en servidor.

- **Por qué:** una sola definición de validación, mensajes consistentes y
  accesibilidad con `Field`.
- **Alternativas:** validación manual (duplicada), solo HTML (insuficiente).

## Risks / Trade-offs

- **Entregabilidad del email** → configurar SMTP propio (Resend) en Supabase
  antes de producción; en desarrollo, límites del email integrado.
- **Open redirect en el callback** → allowlist exacta de `Site URL` y
  `Redirect URLs`; no aceptar `next` arbitrario sin validar contra rutas internas.
- **Cookies mal configuradas** → `httpOnly`, `secure` en producción,
  `sameSite=lax`; nunca leer la sesión desde `localStorage`.
- **RLS incompleta** → probar con dos usuarios (uno normal, uno admin) y añadir
  el caso a la checklist de PR.
- **Fuga de `service_role`** → solo en scripts de servidor; nunca
  `NEXT_PUBLIC_*`.
- **Rate limit del magic link** → límites de Supabase + mensaje claro si se
  supera; no revelar si el email existe.

## Migration Plan

1. Crear/Abrir proyecto Supabase y configurar `Site URL` + `Redirect URLs`.
2. Aplicar migración: `profiles`, trigger, `is_admin()`, RLS.
3. Configurar variables de entorno locales y en Vercel.
4. Promover el primer admin con el script documentado.
5. Rollback: eliminar políticas, trigger y tabla (sin datos de producción en
   esta fase).

### 8. Supabase cloud para M2

Se usa un proyecto Supabase cloud desde el inicio.

- **Por qué:** el daemon de Docker no está disponible para Supabase local y el
  entorno cloud es el mismo que se usará en producción.
- **Alternativas:** Supabase local con Docker (más setup y no disponible ahora).
- **Consecuencia:** las claves viven en `.env.local`; `service_role` solo en
  scripts de servidor.

## Open Questions

Ninguna pendiente. La elección cloud/local se resolvió antes de escribir las
tareas.

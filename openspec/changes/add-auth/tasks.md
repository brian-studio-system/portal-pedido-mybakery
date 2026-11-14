# Tasks

## 1. Setup

- [ ] 1.1 Crear el proyecto Supabase cloud, configurar `Site URL` y `Redirect URLs` (`/auth/callback`), y añadir `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` a `.env.local` y `.env.example` (sin valores reales). Verificar con `curl "$NEXT_PUBLIC_SUPABASE_URL/auth/v1/health"` que responde 200.
- [ ] 1.2 Instalar `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `react-hook-form` y `@hookform/resolvers`, y añadir los componentes `label`, `field` y `alert` de shadcn. Verificar que `pnpm build` sigue en verde.

## 2. Datos y RLS

- [ ] 2.1 Crear la migración de `profiles` (`id`, `email`, `role`, `created_at`), el trigger `after insert` sobre `auth.users` y el check de rol `user|admin`. Verificar aplicando la migración y comprobando que un usuario nuevo obtiene perfil con rol `user`.
- [ ] 2.2 Implementar `is_admin()` con `security definer` y las políticas RLS de `profiles`: el usuario lee/edita su fila, el admin lee todas, nadie cambia su rol desde el cliente. Verificar con dos usuarios (uno normal, uno admin) que el normal no ve la fila ajena.
- [ ] 2.3 Crear el script/documentación de promoción a admin (`docs/auth.md`) usando `service_role` solo en servidor. Verificar que el usuario promovido entra en `/admin` y que una llamada desde el cliente no puede cambiar el rol.

## 3. Sesión y pantallas

- [ ] 3.1 Crear los clientes browser/server de `@supabase/ssr` y el middleware de refresco de sesión. Verificar que la sesión persiste al recargar una página protegida.
- [ ] 3.2 Implementar `/login` con React Hook Form + Zod y `signInWithOtp`, con estados de éxito y error. Verificar email válido (envía enlace), email inválido (error de validación) y rate limit (mensaje claro).
- [ ] 3.3 Implementar `/auth/callback` y `/cuenta` para completar la sesión y mostrar el email. Verificar que un enlace válido redirige a `/cuenta` y uno inválido/expirado muestra error.
- [ ] 3.4 Implementar los guards de `/cuenta` y `/admin` en servidor. Verificar anónimo → `/login`, `user` → acceso denegado a `/admin`, `admin` → panel visible.
- [ ] 3.5 Añadir "Cerrar sesión" y limpiar la sesión. Verificar que tras cerrar sesión las rutas protegidas redirigen a `/login`.

## 4. Tests y documentación

- [ ] 4.1 Añadir tests unitarios de los esquemas Zod y del helper de redirect seguro (solo rutas internas). Verificar con `pnpm test`.
- [ ] 4.2 Añadir un test de RLS que compruebe que un usuario no puede leer ni modificar el perfil de otro. Verificar que el test falla si se desactiva RLS.
- [ ] 4.3 Documentar el flujo completo en `docs/auth.md` (env, migración, admin, redirects, rollback). Verificar que los comandos documentados funcionan tal cual.

## 5. Revisión

- [ ] 5.1 Pasar `security-reviewer` sobre el cambio y corregir hallazgos. Verificar que no quedan hallazgos críticos ni altos sin justificar.
- [ ] 5.2 Pasar `code-reviewer` y corregir los hallazgos aceptados. Verificar que el informe queda referenciado en la PR.
- [ ] 5.3 Ejecutar `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` y `pnpm design:lint`. Verificar que los cinco pasan.

## Workflow follow-up

- Archivar el cambio `add-auth` después del merge y de la revisión humana.
- Registrar la sesión en `docs/ai-usage/AI_ACTIVITY_LOG.md` y la decisión cloud en `docs/decisions.md`.

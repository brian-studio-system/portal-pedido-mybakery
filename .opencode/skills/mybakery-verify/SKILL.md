---
name: mybakery-verify
description: Verifica una entrega de My Bakery con evidencia real (checks, tests, RLS, a11y, marca) antes de abrir o aprobar una PR. No sustituye la revisión humana.
---

# Verificar una entrega de My Bakery

## Preparación

1. Identifica la rama/PR y el cambio de OpenSpec asociado.
2. Lee `AGENTS.md` y los acceptance criteria.
3. Comprueba `git status` y el diff frente a la base.

## Comprobaciones obligatorias

Ejecuta y registra el resultado real. **No afirmes un check que no se ejecutó.**

| Check | Comando | Resultado |
|---|---|---|
| Lint | `pnpm lint` | |
| Tipos | `pnpm typecheck` | |
| Unit | `pnpm test` | |
| E2E | `pnpm test:e2e` (si aplica) | |
| Specs | `openspec validate --strict` | |
| Build | `pnpm build` (si aplica) | |

## Verificación específica del dominio

- **Datos:** RLS probado con un usuario sin permisos; el acceso denegado devuelve
  vacío o error, no datos ajenos.
- **Pedidos:** el total se recalcula en servidor y coincide; doble submit no crea
  dos pedidos.
- **Auth:** sin sesión redirige; usuario normal no accede a `/admin`.
- **UI:** revisar a 390 px y 1440 px; foco visible; sin scroll horizontal.
- **Marca:** sin colores/fuentes fuera de tokens.
- **Secretos:** `git diff` sin claves; `.env` no trackeado.

## Evidencia

Para cada punto, adjunta: comando, salida relevante y fecha. Si algo no se pudo
comprobar, dilo explícitamente y explica por qué.

## Salida

Veredicto: `PASS`, `PASS con observaciones` o `FAIL`, con la lista de checks,
evidencia y pendientes. **No apruebes ni mergees**: eso es decisión humana.

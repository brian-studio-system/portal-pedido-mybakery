---
name: mybakery-review
description: Revisa un diff de My Bakery contra sus acceptance criteria, invariantes de seguridad y tokens de marca; devuelve hallazgos con archivo, impacto y comprobación. Úsala antes de revisión humana o al revisar una PR.
---

# Revisar cambios de My Bakery

## Preparación

1. Identifica la base (rama, `origin/main` o PR) y el alcance solicitado.
2. Lee `AGENTS.md`, el cambio de OpenSpec (`openspec/changes/<id>/`) y la issue.
3. Examina el diff completo y los archivos relacionados necesarios para confirmar
   un posible defecto. Incluye archivos nuevos y cambios sin commit dentro del alcance.

## Qué comprobar, en este orden

### 1. Contrato

- Cada acceptance criteria de la spec tiene implementación y evidencia.
- No hay alcance extra no pedido.
- No se han tocado archivos fuera del ámbito del cambio.

### 2. Invariantes de seguridad

- **RLS** activo en todas las tablas afectadas; probado con usuario no autorizado.
- **`service_role`** solo en servidor; nunca en cliente ni en el bundle.
- **Precio y stock** se recalculan en servidor; el cliente no decide importes.
- **Idempotencia** del pedido (no duplicar con doble clic/reintento).
- **Rate limit** en checkout y login.
- **Roles** validados en servidor (`profiles.role`), nunca en `user_metadata`.
- **Inputs** validados con Zod en servidor.
- Sin secretos, `.env` ni tokens en el diff o en logs.

### 3. Marca y UI

- Solo tokens de `brand/tokens.json`: `ink`, `paper`, `surface`, `crust`, `wheat`,
  `wheat-deep`, `terracotta`, `olive`, `muted`; Playfair Display + Manrope.
- Sin colores hex sueltos, sin Inter/Poppins, sin degradados multicolor, neón,
  glassmorphism ni 3D.
- `wheat` no se usa como texto pequeño.
- Mobile-first, objetivos táctiles ≥ 44 px, foco visible, contraste AA,
  `prefers-reduced-motion`.

### 4. Código

- Tipado correcto; `any` solo justificado.
- Manejo de errores y casos límite (vacío, sin stock, no autenticado, no admin).
- Sin duplicación de lógica; capas respetadas (`app` → `lib` → `components`).
- Tests para lógica de negocio (carrito, precios, stock).

## Salida

Informe con hallazgos ordenados por severidad (crítico/alto/medio/bajo). Cada uno:

```
[severidad] archivo:línea
Condición que lo dispara:
Impacto:
Cómo comprobarlo:
```

Si no hay hallazgos, dilo y enumera qué no se pudo comprobar. No inventes
problemas para completar la lista.

## Límites

Esta skill produce un informe. **No edita, no publica comentarios, no aprueba y
no mergea.** La revisión automática no sustituye la aprobación humana.

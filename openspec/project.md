# OpenSpec Project

## Contexto

Portal de pedidos online de My Bakery (Barcelona). Cliente recoge en tienda.
Stack: Next.js 15 + TypeScript + Tailwind 4 + Supabase + pnpm.

## Convenciones

- Change IDs en kebab-case: `add-cart`, `add-orders`, `add-admin`.
- Cada cambio vive en `openspec/changes/<id>/` con `proposal.md`, `specs/`, `design.md`, `tasks.md`.
- `openspec validate --strict` debe pasar antes de implementar.
- Un cambio = una rama = un PR.

## Invariantes

Ver `AGENTS.md` § Invariantes. Son no negociables para cualquier cambio.

## Esquema de datos (borrador)

- `profiles` (id, email, role, created_at)
- `categories` (id, name, slug, sort_order)
- `products` (id, category_id, name, description, price_cents, unit, image_url, allergens[], is_vegan, is_active, sort_order)
- `business_hours` (id, day_of_week, open_time, close_time, is_closed) — base, sin UI aún
- `pickup_slots` (id, date, start_time, end_time, capacity, is_active) — base, sin UI aún
- `daily_stock` (id, product_id, date, quantity, sold) — base, sin UI aún
- `orders` (id, user_id, status, total_cents, pickup_slot_id, notes, created_at)
- `order_items` (id, order_id, product_id, quantity, unit_price_cents)

## Estados de pedido

`pending` → `confirmed` → `ready` → `picked_up` (o `cancelled`).

## Roles

- `user`: ve catálogo, gestiona su carrito y sus pedidos.
- `admin`: todo lo anterior + panel de pedidos, stock y productos.

## Seguridad

- RLS en todas las tablas.
- `is_admin()` con `security definer`, nunca `user_metadata`.
- Precios recalculados en servidor.
- Rate limit en checkout y login.

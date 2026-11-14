# Ontología del dominio

Vocabulario único del proyecto. Si un término no está aquí, **no se inventa**:
se añade con una decisión y se documenta. Los agentes deben usar estos nombres
exactos; no crear sinónimos.

## Convenciones de nombrado

| Contexto | Convención | Ejemplo |
|---|---|---|
| Tablas Postgres | plural, snake_case | `products`, `order_items` |
| Columnas | snake_case | `price_cents`, `created_at` |
| Tipos TypeScript | PascalCase | `Product`, `OrderItem` |
| Variables/funciones | camelCase | `calculateTotal`, `getProduct` |
| Rutas | kebab-case | `/producto/[slug]`, `/admin/pedidos` |
| Importes | enteros en céntimos + EUR | `650` = 6,50 € |

## Entidades

### Product
Artículo vendible del catálogo.
- `id` (uuid), `category_id`, `name`, `slug`, `description`
- `price_cents` (int, EUR), `unit` (`ud`, `kg`, `barra`, `ración`)
- `image_url`, `allergens` (array), `is_vegan`, `is_active`, `sort_order`
- **Regla:** el precio mostrado y el cobrado salen de `price_cents`; el cliente
  nunca envía el precio.

### Category
Agrupación del catálogo: `panes`, `bolleria`, `pasteleria`.
- `id`, `name`, `slug`, `sort_order`

### Allergen
Alérgeno declarado (Reglamento 1169/2011): `gluten`, `lactosa`, `huevo`,
`frutos_secos`, `soja`, `sésamo`.
- Se muestra siempre en la ficha y en el carrito.

### DailyStock
Unidades disponibles de un producto en una fecha.
- `id`, `product_id`, `date`, `quantity`, `sold`
- **Regla:** `available = quantity - sold`; no puede ser negativo.
- En el MVP es una base de datos preparada; la UI de horarios/stock llega después.

### Cart
Carrito del cliente, persistido en cliente (localStorage) y validado en servidor.
- **No** es una tabla de base de datos en el MVP.
- **Regla:** el servidor recalcula precios, stock y total en el checkout.

### CartItem
Línea del carrito: `product_id`, `quantity`.
- `quantity` entero ≥ 1.

### Order
Pedido confirmado.
- `id`, `user_id`, `status`, `total_cents`, `pickup_slot_id` (nullable en MVP),
  `notes`, `created_at`, `updated_at`
- **Regla:** idempotente; el total se recalcula en servidor.
- Estados: `pending` → `confirmed` → `ready` → `picked_up`; `cancelled` en
  cualquier punto antes de `picked_up`.

### OrderItem
Línea de un pedido.
- `id`, `order_id`, `product_id`, `quantity`, `unit_price_cents`
- **Regla:** `unit_price_cents` se congela en el momento del pedido.

### Profile
Cuenta de usuario, vinculada a `auth.users`.
- `id` (= `auth.users.id`), `email`, `role`, `created_at`
- Roles: `user`, `admin`.
- **Regla:** el rol se lee de `profiles.role` en servidor; nunca de
  `user_metadata`.

### BusinessHours
Horario de apertura. **Base preparada, sin UI en el MVP.**
- `id`, `day_of_week` (0–6), `open_time`, `close_time`, `is_closed`

### PickupSlot
Franja de recogida. **Base preparada, sin UI en el MVP.**
- `id`, `date`, `start_time`, `end_time`, `capacity`, `is_active`

## Reglas transversales

1. Precios en céntimos; nunca floats para dinero.
2. Zona horaria `Europe/Madrid` para horarios; `timestamptz` en base de datos.
3. Stock y disponibilidad se calculan en servidor.
4. Un pedido pertenece a un `user`; un `admin` puede ver todos.
5. "Producto agotado" = `available <= 0`; se muestra con badge `terracotta`.
6. No usar sinónimos: `item`/`línea`, `orden`/`pedido`, `stock`/`existencias`.
   Usa `OrderItem`, `Order`, `DailyStock`.

## Glosario de interfaz

| Término UI | Entidad |
|---|---|
| Producto | `Product` |
| Categoría | `Category` |
| Carrito | `Cart` |
| Pedido | `Order` |
| Recogida | `PickupSlot` |
| Agotado | `DailyStock.available <= 0` |

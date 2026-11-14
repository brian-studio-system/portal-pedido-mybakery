# Prototipos de Stitch

Referencia visual del MVP. **No es código fuente**: la implementación vive en `src/`.

- **Proyecto Stitch:** https://stitch.google.com/projects/5766437364405215573
- **Design system:** `assets/7a2f2b9366f4460a9d535235a0e61a8d`
- **CLI:** `stitch` (`@google/stitch`) con proyecto fijado en `.stitch.json`
- **Skill del agente:** `.agents/skills/stitch/` (`/stitch`)
- **Fuente del design system:** `brand/DESIGN.md`
- **Device:** mobile (390 px de ancho, capturas a 2x)

## Pantallas

| Archivo | Pantalla | Screen ID |
|---|---|---|
| `01-home.png` | Home | `2e520c5c15a84cd6b7ca96a0fbd27e42` |
| `02-carta.png` | Carta / catálogo | `2075d07daad44d4785d442bf4a5d7a66` |
| `03-producto.png` | Ficha de producto | `988ba19d9b1f49f09e9fcff31f50f91a` |
| `04-carrito.png` | Carrito | `2219ca5a7c8043b8952103a1a5a229c7` |

## CLI

```bash
pnpm stitch:serve   # preview local en http://127.0.0.1:3001
pnpm stitch:open    # abre el canvas
pnpm stitch:url     # URL canónica del proyecto
pnpm design:lint    # valida brand/DESIGN.md (0 errores, 0 warnings)
```

## Uso

1. Revisar en la web de Stitch.
2. Iterar con `edit_screens` sobre las pantallas aprobadas.
3. Descargar el HTML solo cuando la dirección visual esté cerrada.
4. Traducir a componentes con los tokens de `brand/tokens.json`, nunca copiando estilos sueltos.

El logo real (`brand/assets/logo/my-bakery-logo.svg`) no se puede subir al MCP de Stitch:
se describe en los prompts y se sustituye al implementar.

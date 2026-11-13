# My Bakery — Identidad y design system

Carpeta de marca del proyecto **portal_pedido_mybakery**.
Aquí vive la fuente de verdad visual: lo que alimenta a Stitch (diseño) y al código (implementación).

## Contenido

| Archivo | Qué es | Para quién |
|---|---|---|
| `BRAND.md` | Identidad completa: posicionamiento, tono, logo, color, tipografía, aplicaciones | Humanos y agentes |
| `DESIGN.md` | Design system en lenguaje semántico, optimizado para Stitch | Stitch (se sube tal cual) |
| `tokens.json` | Tokens DTCG: color, tipografía, espacio, radio, sombra, motion | Código y Figma |
| `brand-sheet.html` | Hoja de marca visual de una página | Abrir en el navegador |
| `assets/logo/` | Logo original | Todos |

Abre `brand-sheet.html` en el navegador para ver la identidad aplicada:

```bash
xdg-open brand/brand-sheet.html
```

## Flujo con Stitch

El design system de Stitch se crea **a partir del `DESIGN.md`**, no a mano.
El orden importa: primero se sube el archivo, y el `upload` devuelve la pantalla
que sirve de base al design system.

```text
1. create_project({ title: "My Bakery — Portal de pedidos", deviceType: "MOBILE" })
2. upload_design_md({ projectId, designMdBase64 })      # base64 -w 0 brand/DESIGN.md
3. get_project({ name })                                 # localizar el screenInstance creado
4. create_design_system_from_design_md({ projectId, selectedScreenInstance })
5. apply_design_system({ assetId, projectId, selectedScreenInstances })
```

Equivalente en terminal para el base64:

```bash
base64 -w 0 brand/DESIGN.md
```

Parámetros de marca para el design system:

```json
{
  "seedColor": "#C9932F",
  "colorMode": "LIGHT",
  "colorVariant": "TONAL_SPOT",
  "headlineFont": "PLAYFAIR_DISPLAY",
  "bodyFont": "MANROPE",
  "labelFont": "MANROPE",
  "roundness": "ROUND_EIGHT",
  "deviceType": "MOBILE"
}
```

> Stitch solo admite su lista cerrada de fuentes. Playfair Display y Manrope están
> dentro, por eso el sistema se puede aplicar 1:1 sin sustituciones.

## Tokens en código

`tokens.json` sigue el formato DTCG, así que funciona con Style Dictionary,
Tokens Studio o un script propio. Para Tailwind, el mapeo mínimo:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        ink: "#14110F",
        paper: "#F7F1E6",
        surface: "#FFFCF6",
        crust: "#7A4A22",
        wheat: "#C9932F",
        "wheat-deep": "#8A6220",
        terracotta: "#9C4A32",
        olive: "#5F6B4A",
        muted: "#6B6259"
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"]
      },
      borderRadius: { sm: "4px", md: "12px", full: "999px" }
    }
  }
};
```

## Pendientes

- [x] Vectorizar el logo a SVG con transparencia (`brand/assets/logo/my-bakery-logo.svg`)
- [ ] Crear versión inversa del logo (paper sobre ink)
- [ ] Validar la pareja tipográfica contra el lettering del logo
- [ ] Subir `DESIGN.md` a Stitch y aplicar el design system
- [ ] Definir fotografía real del obrador y del producto
- [ ] Papelería mínima: tarjeta, bolsa, etiqueta

---
description: Verifica una entrega con evidencia real antes de la PR
---

Carga la skill `mybakery-verify` y verifica el alcance indicado: $ARGUMENTS

Ejecuta los checks reales (lint, typecheck, test, `openspec validate --strict`),
comprueba RLS, pedidos, auth, UI y marca, y devuelve el veredicto con evidencia.
No inventes resultados ni apruebes.

# Decision Log

Registro de decisiones de proyecto asistidas por IA. **Solo un miembro humano del
equipo puede cambiar el estado de aprobación.** El agente puede proponer y
documentar, nunca aprobar en nombre del equipo.

## Estados

| Estado | Significado |
|---|---|
| `Proposed` | Propuesta documentada, pendiente de aprobación humana |
| `Approved` | Aprobada por una persona; puede implementarse |
| `Rejected` | Descartada; se conserva el motivo |
| `Superseded` | Reemplazada por otra decisión (indicar cuál) |

## Índice

| ID | Fecha | Decisión | Estado | Aprobador |
|---|---|---|---|---|
| D-001 | 2026-11-14 | Stack del MVP (Next.js + Supabase + pnpm) | Approved | Brian |
| D-002 | 2026-11-14 | Magic link para auth | Approved | Brian |
| D-003 | 2026-11-14 | Pago al recoger en el MVP | Approved | Brian |
| D-004 | 2026-11-14 | Solo productos en la primera fase | Approved | Brian |

## Plantilla de entrada

```md
### D-XXX — Título

- **Fecha:**
- **Problema que resuelve:**
- **Contexto y evidencia:**
- **Alternativas consideradas:**
- **Recomendación de la IA y justificación:**
- **Decisión final:**
- **Estado:** Proposed | Approved | Rejected | Superseded
- **Aprobador humano:**
- **Implementación:** Pendiente | En curso | Hecha
- **Validación:** (tests, evidencias, enlaces)
```

## Entradas

### D-001 — Stack del MVP

- **Fecha:** 2026-11-14
- **Problema que resuelve:** elegir una base técnica para el portal de pedidos.
- **Contexto y evidencia:** ver `docs/adr/0001-stack.md`.
- **Alternativas consideradas:** Vite + React, Firebase, HTML plano.
- **Recomendación de la IA y justificación:** Next.js + Supabase + pnpm por SSR,
  RLS y velocidad de MVP.
- **Decisión final:** adoptado.
- **Estado:** Approved
- **Aprobador humano:** Brian
- **Implementación:** Pendiente (M1)
- **Validación:** pendiente de scaffold.

### D-002 — Magic link para auth

- **Fecha:** 2026-11-14
- **Problema que resuelve:** cómo autenticar clientes y admin sin gestionar contraseñas.
- **Contexto y evidencia:** Supabase Auth `signInWithOtp`; roles en `profiles.role`.
- **Alternativas consideradas:** email + contraseña, OAuth social.
- **Recomendación de la IA y justificación:** magic link reduce fricción y superficie
  de ataque; requiere SMTP propio (Resend) en producción.
- **Decisión final:** adoptado.
- **Estado:** Approved
- **Aprobador humano:** Brian
- **Implementación:** Pendiente (M2)
- **Validación:** pendiente.

### D-003 — Pago al recoger en el MVP

- **Fecha:** 2026-11-14
- **Problema que resuelve:** cómo cobrar sin pasarela en la primera versión.
- **Contexto y evidencia:** el checkout crea un pedido `pending` y notifica al admin.
- **Alternativas consideradas:** Stripe desde el día 1, Redsys, transferencia.
- **Recomendación de la IA y justificación:** validar demanda sin comisiones ni
  superficie de cumplimiento; la pasarela llega post-MVP.
- **Decisión final:** adoptado.
- **Estado:** Approved
- **Aprobador humano:** Brian
- **Implementación:** Pendiente (M5)
- **Validación:** pendiente.

### D-004 — Solo productos en la primera fase

- **Fecha:** 2026-11-14
- **Problema que resuelve:** acotar el alcance del MVP.
- **Contexto y evidencia:** el horario queda como tablas base (`business_hours`,
  `pickup_slots`) sin UI ni lógica de recogida.
- **Alternativas consideradas:** incluir horarios y franjas desde el inicio.
- **Recomendación de la IA y justificación:** reducir alcance para llegar antes a
  un catálogo funcional.
- **Decisión final:** adoptado.
- **Estado:** Approved
- **Aprobador humano:** Brian
- **Implementación:** Pendiente (M2)
- **Validación:** pendiente.

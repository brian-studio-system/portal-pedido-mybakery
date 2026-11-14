import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Cuenta",
};

export default function CuentaPage() {
  return (
    <Container className="py-20 md:py-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-wheat-deep">
        Cuenta
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
        El acceso llega en la siguiente fase.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Estamos preparando el acceso con enlace por email. Todavía no hay
        sesiones ni pedidos guardados.
      </p>
    </Container>
  );
}

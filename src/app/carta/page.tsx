import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Carta",
};

export default function CartaPage() {
  return (
    <Container className="py-20 md:py-28">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-wheat-deep">
        Carta
      </p>
      <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
        El catálogo llega en la siguiente fase.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Estamos cargando los panes, la bollería y la pastelería del obrador.
        Mientras tanto, puedes volver al inicio.
      </p>
    </Container>
  );
}

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="py-14 md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-wheat-deep">
            Obrador artesanal · Barcelona
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-[-0.025em] md:text-6xl">
            Horneado cada mañana.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Pan de masa madre, bollería y pasteles. Hecho en el barrio desde
            2020.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/carta">Ver la carta</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cuenta">Mi cuenta</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">
            Recogida en tienda · Pago al recoger
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-ink/15 bg-surface p-8">
            {/* El logo es el único activo visual real disponible en M1. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/my-bakery-logo.svg"
              alt="My Bakery"
              className="h-full w-auto max-h-[360px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

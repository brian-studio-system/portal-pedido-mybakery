import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/my-bakery-logo.svg"
            alt="My Bakery"
            width={96}
            height={96}
            className="h-24 w-24 invert"
          />
          <p className="mt-4 text-sm leading-relaxed text-paper/70">
            Obrador artesanal · Barcelona
            <br />
            Desde 2020
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-wheat">
            Tienda
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>Carta</li>
            <li>Pedidos</li>
            <li>Encargos</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-wheat">
            Horario
          </p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>Martes a sábado · 08:00–20:00</li>
            <li>Domingo · 08:30–14:00</li>
            <li>Lunes · cerrado</li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-paper/15 py-6 text-xs text-paper/60">
        © 2026 My Bakery · Hecho en Barcelona
      </Container>
    </footer>
  );
}

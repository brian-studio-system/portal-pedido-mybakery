import Link from "next/link";

import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-sm">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/my-bakery-logo.svg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            My Bakery
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/carta"
            className="hidden text-sm font-medium text-ink/80 transition-colors hover:text-crust sm:inline"
          >
            Carta
          </Link>
          <Link
            href="/cuenta"
            className="hidden text-sm font-medium text-ink/80 transition-colors hover:text-crust sm:inline"
          >
            Cuenta
          </Link>
          <Link
            href="/carta"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
          >
            Pedir
          </Link>
        </nav>
      </Container>
    </header>
  );
}

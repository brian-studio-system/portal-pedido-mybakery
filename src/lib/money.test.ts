import { describe, expect, it } from "vitest";

import { formatPrice } from "./money";

describe("formatPrice", () => {
  it("formatea céntimos como euros", () => {
    expect(formatPrice(650)).toContain("6,50");
  });

  it("usa dos decimales", () => {
    expect(formatPrice(100)).toContain("1,00");
  });

  it("rechaza importes no enteros", () => {
    expect(() => formatPrice(6.5)).toThrow(TypeError);
  });
});

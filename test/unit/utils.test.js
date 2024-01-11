import { expect, test } from "vitest";
import { DistanceDisplay } from "../../src/function/distancetodisplay";
test("Calcul distance works", () => {
  const result = DistanceDisplay({ x1: 5, y1: 3, x2: 10, y2: 3 });
  const expectedDistance = 5; // Remplacez 5 par la distance correcte
  expect(result).toBe(expectedDistance);
});

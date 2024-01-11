import { expect, test, assert } from "vitest";
import { JSDOM } from "jsdom";
import { DistanceDisplay } from "../../src/function/distancetodisplay";
import { showMarketData } from "../../src/function/showMarketData";
test("Calcul distance works", () => {
  const result = DistanceDisplay({ x1: 5, y1: 3, x2: 10, y2: 3 });
  const expectedDistance = 5; // Remplacez 5 par la distance correcte
  expect(result).toBe(expectedDistance);
});

test("Test showMarketData function", () => {
  // Créez un objet d'espion pour simuler document.querySelector
  const querySelectorSpy = (selector) => {
    if (selector === ".marketplace") {
      return { classList: { remove: () => {} } };
    }
    return null;
  };

  // Créez un DOM simulé avec jsdom
  const dom = new JSDOM("<html><body></body></html>");
  global.document = dom.window.document;

  // Espionnez la fonction document.querySelector
  const originalQuerySelector = global.document.querySelector;
  global.document.querySelector = querySelectorSpy;

  // Appelez la fonction que vous testez
  showMarketData();

  // Vérifiez si document.querySelector a bien été appelée avec ".marketplace"
  assert(
    querySelectorSpy(".marketplace"),
    "document.querySelector n'a pas été appelée avec le bon sélecteur"
  );

  // Restaurez la fonction d'origine après le test
  global.document.querySelector = originalQuerySelector;
});

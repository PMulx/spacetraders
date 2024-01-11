import { expect, test } from "vitest";
import { AddContactForm } from "../../src/routes/buy";

console.log("utils.test.js is loaded");
test("User well connected", () => {
  console.log("Test is running");
  globalThis.localStorage = {
    getItem: () => "mocked-token",
  };

  const result = AddContactForm();

  const token = result.token;

  expect(token).not.toBeNull();
  expect(token).not.toBeUndefined();
  expect(typeof token).toBe("string");
  expect(token).toBeTruthy();
});

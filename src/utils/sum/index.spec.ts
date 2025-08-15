import { sum } from ".";

describe("Test of sum", () => {
  test("Edge case", () => {
    expect(sum()).toEqual(0);
  });

  test("Edge case", () => {
    expect(sum(1)).toEqual(1);
  });

  test("Regular case", () => {
    expect(sum(1, 2, 3)).toEqual(6);
  });
});

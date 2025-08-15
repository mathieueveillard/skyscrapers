import { reverse } from ".";

describe("Test of reverse", () => {
  test("", () => {
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });
});

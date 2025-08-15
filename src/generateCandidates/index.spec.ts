import { swap, swapN, hide, generateCandidates } from ".";

describe("Test of swap", () => {
  test("Edge case", () => {
    expect(swap([])({ index: 0 })).toEqual([]);
  });

  test("Edge case", () => {
    expect(swap([1])({ index: 0 })).toEqual([1]);
  });

  test("Dimension 2, index 0", () => {
    expect(swap([1, 2])({ index: 0 })).toEqual([2, 1]);
  });

  test("Dimension 2, index 1", () => {
    expect(swap([1, 2])({ index: 1 })).toEqual([1, 2]);
  });

  test("Dimension 3, index 0", () => {
    expect(swap([1, 2, 3])({ index: 0 })).toEqual([2, 1, 3]);
  });

  test("[Control] Dimension 3, index 1", () => {
    expect(swap([1, 2, 3])({ index: 1 })).toEqual([1, 3, 2]);
  });

  test("[Control] Dimension 3, index 2", () => {
    expect(swap([1, 2, 3])({ index: 2 })).toEqual([1, 2, 3]);
  });
});

describe("Test of swapN", () => {
  test("Swap 1 time", () => {
    expect(swapN([1, 2, 3])({ index: 0, times: 1 })).toEqual([2, 1, 3]);
  });

  test("Swap 2 times", () => {
    expect(swapN([1, 2, 3])({ index: 0, times: 2 })).toEqual([2, 3, 1]);
  });
});

describe("Test of hide", () => {
  test("Dimension 0", () => {
    expect(hide([])).toEqual([[]]);
  });

  test("Dimension 1", () => {
    expect(hide([1])).toEqual([[1]]);
  });

  test("Dimension 2", () => {
    expect(hide([1, 2])).toEqual([[2, 1]]);
  });

  test("Dimension 3", () => {
    expect(hide([1, 2, 3])).toEqual([
      [2, 1, 3], //
      [2, 3, 1],
      [1, 3, 2],
    ]);
  });

  test("[Control] Dimension 4", () => {
    expect(hide([1, 2, 3, 4])).toEqual([
      [2, 1, 3, 4], //
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [1, 2, 4, 3],
    ]);
  });
});

describe("Test of generateCandidates", () => {
  test("Target sight = actual sight", () => {
    expect(generateCandidates({ dimension: 3 })({ sight: 3 })).toEqual([[1, 2, 3]]);
  });

  test("Target sight = actual sight - 1", () => {
    expect(generateCandidates({ dimension: 3 })({ sight: 2 })).toEqual([
      [2, 1, 3], //
      [2, 3, 1],
      [1, 3, 2],
    ]);
  });

  test("Target sight = actual sight - 2", () => {
    const actual = generateCandidates({ dimension: 3 })({ sight: 1 });

    expect(actual).toEqual([
      [3, 2, 1], //
      [3, 1, 2],
    ]);
  });

  test("Target sight = actual sight - 2", () => {
    const actual = generateCandidates({ dimension: 4 })({ sight: 2 });

    expect(actual).toEqual([
      [2, 1, 4, 3], //
      [3, 2, 1, 4],
      [3, 1, 2, 4],
      [3, 1, 4, 2],
      [3, 2, 4, 1],
      [3, 4, 2, 1],
      [3, 4, 1, 2],
      [2, 4, 3, 1],
      [2, 4, 1, 3],
      [1, 4, 3, 2],
      [1, 4, 2, 3],
    ]);
  });
});

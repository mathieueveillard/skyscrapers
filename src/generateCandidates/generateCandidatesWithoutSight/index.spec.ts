import {
  PartialSkyline,
  identifyMissingHeights,
  generateAllPermutations,
  bundle,
  generateCandidatesWithoutSight,
} from ".";
import { Candidates, Height } from "../../core";

describe("Test of identifyMissingHeights", () => {
  test("Dimension 4", () => {
    // Given
    const skyline: PartialSkyline = [undefined, undefined, 3, 4];

    // When
    const actual = identifyMissingHeights({ dimension: 4 })(skyline);

    // Then
    const expected: Height[] = [1, 2];
    expect(actual).toEqual(expected);
  });
});

describe("Test of generateAllPermutations", () => {
  test("Dimension 2", () => {
    // Given
    const values: number[] = [1, 2];

    // When
    const actual = generateAllPermutations(values);

    // Then
    const expected: number[][] = [
      [1, 2],
      [2, 1],
    ];
    expect(actual).toEqual(expected);
  });

  test("Dimension 3", () => {
    // Given
    const values: number[] = [1, 2, 3];

    // When
    const actual = generateAllPermutations(values);

    // Then
    const expected: number[][] = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of bundle", () => {
  test("Dimension 5", () => {
    // Given
    const permutations: Height[][] = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ];
    const skyline: PartialSkyline = [undefined, 4, 5, undefined, undefined];

    // When
    const actual = bundle(skyline)(permutations);

    // Then
    const expected: Candidates = [
      [1, 4, 5, 2, 3],
      [1, 4, 5, 3, 2],
      [2, 4, 5, 1, 3],
      [2, 4, 5, 3, 1],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 2, 1],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of generateCandidatesWithoutSight", () => {
  test("Dimension 5", () => {
    // Given
    const skyline: PartialSkyline = [undefined, 4, 5, undefined, undefined];

    // When
    const actual = generateCandidatesWithoutSight({ dimension: 5 })(skyline);

    // Then
    const expected: Candidates = [
      [1, 4, 5, 2, 3],
      [1, 4, 5, 3, 2],
      [2, 4, 5, 1, 3],
      [2, 4, 5, 3, 1],
      [3, 4, 5, 1, 2],
      [3, 4, 5, 2, 1],
    ];
    expect(actual).toEqual(expected);
  });
});

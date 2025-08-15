import {
  filterOnXCompatibleCandidates,
  filterOnYCompatibleCandidates,
  filterWithOppositeSight,
  filterWithSight,
  isXValidCandidate,
  isYValidCandidate,
} from ".";
import { Candidate, Candidates } from "../core";
import { GridBuilder } from "../core/grid";
import { SightBuilder } from "../core/sight";

describe("Test of filterWithSight", () => {
  test("One single test", () => {
    // Given
    const candidates: Candidates = [
      [1, 2, 3, 4],
      [1, 2, 4, 3],
    ];

    // When
    const actual = filterWithSight({ sight: 3 })(candidates);

    // Then
    const expected: Candidates = [[1, 2, 4, 3]];
    expect(actual).toEqual(expected);
  });
});

describe("Test of filterWithOppositeSight", () => {
  test("One single test", () => {
    // Given
    const candidates: Candidates = [
      [1, 2, 3, 4],
      [1, 2, 4, 3],
    ];

    // When
    const actual = filterWithOppositeSight({ sight: 1 })(candidates);

    // Then
    const expected: Candidates = [[1, 2, 3, 4]];
    expect(actual).toEqual(expected);
  });
});

describe("Test of isXValidCandidate", () => {
  test("[Control]", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 3, y: 0, height: 2 })
      .set({ x: 2, y: 2, height: 3 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isXValidCandidate({ sight })(grid)({ x: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("Taking sight into account (bottom)", () => {
    // Given
    const sight = new SightBuilder() //
      .bottom({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isXValidCandidate({ sight })(grid)({ x: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });
});

describe("Test of filterOnXCompatibleCandidates", () => {
  test("", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 3, y: 3, height: 4 })
      .build();
    const candidates: Candidates = [
      [1, 2, 4, 3], //
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [2, 1, 3, 4],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
    ];

    // When
    const actual = filterOnXCompatibleCandidates({ sight })(grid)({ x: 1 })(candidates);

    // Then
    const expected: Candidates = [
      [1, 2, 4, 3], //
      [1, 3, 4, 2],
      [2, 3, 4, 1],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of isYValidCandidate", () => {
  test("Empty grid", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder().build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(true);
  });

  test("Different height for a given position", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 4 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("Same height for a given position", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(true);
  });

  test("[Triangulation] Different height for a given position", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 1, y: 0, height: 4 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("Same height is already present", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 3, height: 1 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("[Control]", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 3, height: 2 })
      .set({ x: 2, y: 2, height: 3 })
      .build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("Incompatible left sight", () => {
    // Given
    const sight = new SightBuilder() //
      .left({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  test("Incompatible right sight", () => {
    // Given
    const sight = new SightBuilder() //
      .right({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();
    const candidate: Candidate = [1, 2, 3, 4];

    // When
    const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

    // Then
    expect(actual).toEqual(false);
  });

  describe("Incompatible top and bottom sights", () => {
    test("x is complete", () => {
      // Given
      const sight = new SightBuilder() //
        .top({ i: 0, sight: 2 })
        .build();
      const grid = new GridBuilder() //
        .set({ x: 0, y: 1, height: 2 })
        .set({ x: 0, y: 2, height: 3 })
        .set({ x: 0, y: 3, height: 4 })
        .build();
      const candidate: Candidate = [1, 2, 3, 4];

      // When
      const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

      // Then
      expect(actual).toEqual(false);
    });

    test("x is incomplete", () => {
      // Given
      const sight = new SightBuilder() //
        .top({ i: 0, sight: 2 })
        .build();
      const grid = new GridBuilder() //
        .set({ x: 0, y: 1, height: 2 })
        .set({ x: 0, y: 2, height: 3 })
        .build();
      const candidate: Candidate = [1, 2, 3, 4];

      // When
      const actual = isYValidCandidate({ sight })(grid)({ y: 0 })(candidate);

      // Then
      expect(actual).toEqual(true);
    });
  });
});

describe("Test of filterOnYCompatibleCandidates", () => {
  test("", () => {
    // Given
    const sight = new SightBuilder().build();
    const grid = new GridBuilder() //
      .set({ x: 3, y: 3, height: 4 })
      .build();
    const candidates: Candidates = [
      [1, 2, 4, 3], //
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [2, 1, 3, 4],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
    ];

    // When
    const actual = filterOnYCompatibleCandidates({ sight })(grid)({ y: 1 })(candidates);

    // Then
    const expected: Candidates = [
      [1, 2, 4, 3], //
      [1, 3, 4, 2],
      [2, 3, 4, 1],
    ];
    expect(actual).toEqual(expected);
  });
});

import { computeSight, FullSight, matchesSight, SightBuilder, transposeFullSight } from ".";

describe("Test of transposeFullSight", () => {
  test("", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 1 })
      .right({ i: 1, sight: 2 })
      .bottom({ i: 2, sight: 3 })
      .left({ i: 3, sight: 4 })
      .build();

    // When
    const actual = transposeFullSight(sight);

    // Then
    const expected: FullSight = {
      top: new Map().set(3, 4),
      right: new Map().set(2, 3),
      bottom: new Map().set(1, 2),
      left: new Map().set(0, 1),
    };
    expect(actual).toEqual(expected);
  });
});

describe("Test of computeSight", () => {
  test("Dimension = 1", () => {
    expect(computeSight([1])).toEqual(1);
  });

  test("Dimension = 2, default skyline", () => {
    expect(computeSight([1, 2])).toEqual(2);
  });

  test("Dimension = 2", () => {
    expect(computeSight([2, 1])).toEqual(1);
  });

  test("[Control] Dimension = 3", () => {
    expect(computeSight([1, 2, 3])).toEqual(3);
  });

  test("[Control] Dimension = 3", () => {
    expect(computeSight([1, 3, 2])).toEqual(2);
  });

  test("[Control] Dimension = 3", () => {
    expect(computeSight([3, 1, 2])).toEqual(1);
  });
});

describe("Test of matchesSight", () => {
  test("Passing", () => {
    expect(matchesSight({ sight: 1 })([4, 1, 2, 3])).toEqual(true);
  });

  test("Non-passing", () => {
    expect(matchesSight({ sight: 4 })([4, 1, 2, 3])).toEqual(false);
  });
});

import { ExecutionPlan, generateExecutionPlan } from ".";
import { GridBuilder } from "../core/grid";
import { SightBuilder } from "../core/sight";

describe("Test of generateExecutionPlan", () => {
  test("Default case", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 2 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "x", index: 0 }, //
      { direction: "x", index: 1 },
      { direction: "y", index: 0 },
      { direction: "y", index: 1 },
    ];
    expect(actual).toEqual(expected);
  });

  test("It should handle columns with sight first", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 2 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "x", index: 1 }, //
      { direction: "x", index: 0 },
      { direction: "y", index: 0 },
      { direction: "y", index: 1 },
    ];
    expect(actual).toEqual(expected);
  });

  test("With bottom sight", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .top({ i: 2, sight: 2 })
      .bottom({ i: 2, sight: 2 })
      .bottom({ i: 3, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 4 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "x", index: 2 }, //
      { direction: "x", index: 1 },
      { direction: "x", index: 3 },
      { direction: "x", index: 0 },
      { direction: "y", index: 0 },
      { direction: "y", index: 1 },
      { direction: "y", index: 2 },
      { direction: "y", index: 3 },
    ];
    expect(actual).toEqual(expected);
  });

  test("With grid values", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 2, sight: 2 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 1, y: 0, height: 3 })
      .build();

    // When
    const actual = generateExecutionPlan({ dimension: 3 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "x", index: 2 }, //
      { direction: "x", index: 1 },
      { direction: "y", index: 0 },
      { direction: "x", index: 0 },
      { direction: "y", index: 1 },
      { direction: "y", index: 2 },
    ];
    expect(actual).toEqual(expected);
  });

  test("[Control] With grid values", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .bottom({ i: 0, sight: 2 })
      .top({ i: 1, sight: 2 })
      .bottom({ i: 1, sight: 2 })
      .top({ i: 2, sight: 1 })
      .top({ i: 3, sight: 1 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 3 })
      .set({ x: 2, y: 0, height: 3 })
      .set({ x: 4, y: 0, height: 3 })
      .build();

    // When
    const actual = generateExecutionPlan({ dimension: 6 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "x", index: 0 }, //
      { direction: "x", index: 1 },
      { direction: "x", index: 2 },
      { direction: "x", index: 3 },
      { direction: "y", index: 0 },
      { direction: "x", index: 4 },
      { direction: "x", index: 5 },
      { direction: "y", index: 1 },
      { direction: "y", index: 2 },
      { direction: "y", index: 3 },
      { direction: "y", index: 4 },
      { direction: "y", index: 5 },
    ];
    expect(actual).toEqual(expected);
  });

  test("With left and right sides", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .left({ i: 0, sight: 2 })
      .right({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 3 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "y", index: 0 }, //
      { direction: "x", index: 1 },
      { direction: "x", index: 0 },
      { direction: "x", index: 2 },
      { direction: "y", index: 1 },
      { direction: "y", index: 2 },
    ];
    expect(actual).toEqual(expected);
  });

  test("Take sight value into account (highest first)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .bottom({ i: 2, sight: 3 })
      .left({ i: 0, sight: 1 })
      .right({ i: 0, sight: 1 })
      .left({ i: 1, sight: 1 })
      .right({ i: 1, sight: 3 })
      .left({ i: 2, sight: 1 })
      .right({ i: 2, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 3 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "y", index: 1 }, //
      { direction: "y", index: 2 },
      { direction: "y", index: 0 },
      { direction: "x", index: 2 },
      { direction: "x", index: 1 },
      { direction: "x", index: 0 },
    ];
    expect(actual).toEqual(expected);
  });
  test("If same maximum value of sight, compare the sums", () => {
    // Given
    const sight = new SightBuilder() //
      .left({ i: 0, sight: 3 })
      .right({ i: 0, sight: 1 })
      .left({ i: 1, sight: 2 })
      .right({ i: 1, sight: 3 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = generateExecutionPlan({ dimension: 3 })(sight)(grid);

    // Then
    const expected: ExecutionPlan = [
      { direction: "y", index: 1 }, //
      { direction: "y", index: 0 },
      { direction: "x", index: 0 },
      { direction: "x", index: 1 },
      { direction: "x", index: 2 },
      { direction: "y", index: 2 },
    ];
    expect(actual).toEqual(expected);
  });
});

import { solve } from ".";
import { GridBuilder } from "../core/grid";
import { SightBuilder } from "../core/sight";
import { getResult } from "../utils/result";

describe("Test of solve", () => {
  test("Dimension 2", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 2 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 1, y: 1, height: 1 })
      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 3", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 3 })
      .right({ i: 1, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 3 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 3 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 1, y: 1, height: 3 })
      .set({ x: 1, y: 2, height: 1 })
      .set({ x: 2, y: 0, height: 3 })
      .set({ x: 2, y: 1, height: 1 })
      .set({ x: 2, y: 2, height: 2 })
      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 4 (normal)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .right({ i: 2, sight: 2 })
      .right({ i: 3, sight: 1 })
      .left({ i: 1, sight: 3 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 4 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 4 })
      .set({ x: 0, y: 1, height: 1 })
      .set({ x: 0, y: 2, height: 3 })
      .set({ x: 0, y: 3, height: 2 })
      .set({ x: 1, y: 0, height: 3 })
      .set({ x: 1, y: 1, height: 2 })
      .set({ x: 1, y: 2, height: 4 })
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 2, y: 0, height: 2 })
      .set({ x: 2, y: 1, height: 4 })
      .set({ x: 2, y: 2, height: 1 })
      .set({ x: 2, y: 3, height: 3 })
      .set({ x: 3, y: 0, height: 1 })
      .set({ x: 3, y: 1, height: 3 })
      .set({ x: 3, y: 2, height: 2 })
      .set({ x: 3, y: 3, height: 4 })
      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 4 (hard)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .right({ i: 0, sight: 3 })
      .bottom({ i: 1, sight: 2 })
      .bottom({ i: 3, sight: 2 })
      .left({ i: 2, sight: 2 })
      .left({ i: 3, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 4 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 4 })
      .set({ x: 0, y: 1, height: 1 })
      .set({ x: 0, y: 2, height: 3 })
      .set({ x: 0, y: 3, height: 2 })
      .set({ x: 1, y: 0, height: 3 })
      .set({ x: 1, y: 1, height: 2 })
      .set({ x: 1, y: 2, height: 4 })
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 2, y: 0, height: 1 })
      .set({ x: 2, y: 1, height: 3 })
      .set({ x: 2, y: 2, height: 2 })
      .set({ x: 2, y: 3, height: 4 })
      .set({ x: 3, y: 0, height: 2 })
      .set({ x: 3, y: 1, height: 4 })
      .set({ x: 3, y: 2, height: 1 })
      .set({ x: 3, y: 3, height: 3 })
      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 5 (normal)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .right({ i: 0, sight: 3 })
      .right({ i: 3, sight: 4 })
      .bottom({ i: 3, sight: 1 })
      .bottom({ i: 4, sight: 3 })
      .left({ i: 2, sight: 2 })
      .left({ i: 4, sight: 2 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 5 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 3 })
      .set({ x: 0, y: 1, height: 1 })
      .set({ x: 0, y: 2, height: 2 })
      .set({ x: 0, y: 3, height: 5 })
      .set({ x: 0, y: 4, height: 4 })

      .set({ x: 1, y: 0, height: 5 })
      .set({ x: 1, y: 1, height: 3 })
      .set({ x: 1, y: 2, height: 1 })
      .set({ x: 1, y: 3, height: 4 })
      .set({ x: 1, y: 4, height: 2 })

      .set({ x: 2, y: 0, height: 2 })
      .set({ x: 2, y: 1, height: 4 })
      .set({ x: 2, y: 2, height: 5 })
      .set({ x: 2, y: 3, height: 3 })
      .set({ x: 2, y: 4, height: 1 })

      .set({ x: 3, y: 0, height: 4 })
      .set({ x: 3, y: 1, height: 2 })
      .set({ x: 3, y: 2, height: 3 })
      .set({ x: 3, y: 3, height: 1 })
      .set({ x: 3, y: 4, height: 5 })

      .set({ x: 4, y: 0, height: 1 })
      .set({ x: 4, y: 1, height: 5 })
      .set({ x: 4, y: 2, height: 4 })
      .set({ x: 4, y: 3, height: 2 })
      .set({ x: 4, y: 4, height: 3 })
      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 5 (hard)", () => {
    // Given
    const sight = new SightBuilder() //
      .right({ i: 1, sight: 4 })
      .bottom({ i: 1, sight: 2 })
      .bottom({ i: 3, sight: 4 })
      .left({ i: 0, sight: 2 })
      .left({ i: 2, sight: 2 })
      .left({ i: 3, sight: 4 })
      .build();
    const grid = new GridBuilder().build();

    // When
    const actual = solve({ dimension: 5 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 3 })
      .set({ x: 0, y: 1, height: 5 })
      .set({ x: 0, y: 2, height: 2 })
      .set({ x: 0, y: 3, height: 1 })
      .set({ x: 0, y: 4, height: 4 })

      .set({ x: 1, y: 0, height: 1 })
      .set({ x: 1, y: 1, height: 4 })
      .set({ x: 1, y: 2, height: 5 })
      .set({ x: 1, y: 3, height: 2 })
      .set({ x: 1, y: 4, height: 3 })

      .set({ x: 2, y: 0, height: 2 })
      .set({ x: 2, y: 1, height: 3 })
      .set({ x: 2, y: 2, height: 1 })
      .set({ x: 2, y: 3, height: 4 })
      .set({ x: 2, y: 4, height: 5 })

      .set({ x: 3, y: 0, height: 5 })
      .set({ x: 3, y: 1, height: 1 })
      .set({ x: 3, y: 2, height: 4 })
      .set({ x: 3, y: 3, height: 3 })
      .set({ x: 3, y: 4, height: 2 })

      .set({ x: 4, y: 0, height: 4 })
      .set({ x: 4, y: 1, height: 2 })
      .set({ x: 4, y: 2, height: 3 })
      .set({ x: 4, y: 3, height: 5 })
      .set({ x: 4, y: 4, height: 1 })

      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 6 (normal)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 2 })
      .top({ i: 4, sight: 3 })
      .top({ i: 5, sight: 2 })
      .right({ i: 1, sight: 3 })
      .right({ i: 3, sight: 3 })
      .right({ i: 4, sight: 3 })
      .bottom({ i: 2, sight: 4 })
      .bottom({ i: 3, sight: 3 })
      .bottom({ i: 4, sight: 3 })
      .left({ i: 4, sight: 2 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 2, y: 0, height: 2 })
      .set({ x: 5, y: 1, height: 2 })
      .set({ x: 2, y: 4, height: 1 })
      .build();

    // When
    const actual = solve({ dimension: 6 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 5 })
      .set({ x: 0, y: 2, height: 4 })
      .set({ x: 0, y: 3, height: 6 })
      .set({ x: 0, y: 4, height: 3 })
      .set({ x: 0, y: 5, height: 2 })

      .set({ x: 1, y: 0, height: 4 })
      .set({ x: 1, y: 1, height: 3 })
      .set({ x: 1, y: 2, height: 2 })
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 1, y: 4, height: 6 })
      .set({ x: 1, y: 5, height: 5 })

      .set({ x: 2, y: 0, height: 2 })
      .set({ x: 2, y: 1, height: 6 })
      .set({ x: 2, y: 2, height: 5 })
      .set({ x: 2, y: 3, height: 4 })
      .set({ x: 2, y: 4, height: 1 })
      .set({ x: 2, y: 5, height: 3 })

      .set({ x: 3, y: 0, height: 6 })
      .set({ x: 3, y: 1, height: 1 })
      .set({ x: 3, y: 2, height: 3 })
      .set({ x: 3, y: 3, height: 5 })
      .set({ x: 3, y: 4, height: 2 })
      .set({ x: 3, y: 5, height: 4 })

      .set({ x: 4, y: 0, height: 3 })
      .set({ x: 4, y: 1, height: 4 })
      .set({ x: 4, y: 2, height: 6 })
      .set({ x: 4, y: 3, height: 2 })
      .set({ x: 4, y: 4, height: 5 })
      .set({ x: 4, y: 5, height: 1 })

      .set({ x: 5, y: 0, height: 5 })
      .set({ x: 5, y: 1, height: 2 })
      .set({ x: 5, y: 2, height: 1 })
      .set({ x: 5, y: 3, height: 3 })
      .set({ x: 5, y: 4, height: 4 })
      .set({ x: 5, y: 5, height: 6 })

      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 6 (hard)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 2, sight: 3 })
      .top({ i: 3, sight: 3 })
      .top({ i: 5, sight: 3 })
      .right({ i: 4, sight: 3 })
      .right({ i: 5, sight: 2 })
      .bottom({ i: 0, sight: 2 })
      .bottom({ i: 2, sight: 1 })
      .bottom({ i: 4, sight: 4 })
      .left({ i: 0, sight: 1 })
      .left({ i: 2, sight: 2 })
      .left({ i: 3, sight: 3 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 1, y: 5, height: 2 })
      .set({ x: 2, y: 4, height: 1 })
      .build();

    // When
    const actual = solve({ dimension: 6 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 6 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 1 })
      .set({ x: 0, y: 3, height: 3 })
      .set({ x: 0, y: 4, height: 4 })
      .set({ x: 0, y: 5, height: 5 })

      .set({ x: 1, y: 0, height: 3 })
      .set({ x: 1, y: 1, height: 4 })
      .set({ x: 1, y: 2, height: 6 })
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 1, y: 4, height: 5 })
      .set({ x: 1, y: 5, height: 2 })

      .set({ x: 2, y: 0, height: 4 })
      .set({ x: 2, y: 1, height: 3 })
      .set({ x: 2, y: 2, height: 2 })
      .set({ x: 2, y: 3, height: 5 })
      .set({ x: 2, y: 4, height: 1 })
      .set({ x: 2, y: 5, height: 6 })

      .set({ x: 3, y: 0, height: 2 })
      .set({ x: 3, y: 1, height: 1 })
      .set({ x: 3, y: 2, height: 5 })
      .set({ x: 3, y: 3, height: 4 })
      .set({ x: 3, y: 4, height: 6 })
      .set({ x: 3, y: 5, height: 3 })

      .set({ x: 4, y: 0, height: 5 })
      .set({ x: 4, y: 1, height: 6 })
      .set({ x: 4, y: 2, height: 4 })
      .set({ x: 4, y: 3, height: 2 })
      .set({ x: 4, y: 4, height: 3 })
      .set({ x: 4, y: 5, height: 1 })

      .set({ x: 5, y: 0, height: 1 })
      .set({ x: 5, y: 1, height: 5 })
      .set({ x: 5, y: 2, height: 3 })
      .set({ x: 5, y: 3, height: 6 })
      .set({ x: 5, y: 4, height: 2 })
      .set({ x: 5, y: 5, height: 4 })

      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 6 (Thomas Vuille)", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 1, sight: 3 })
      .top({ i: 2, sight: 2 })
      .top({ i: 3, sight: 1 })
      .right({ i: 0, sight: 2 })
      .right({ i: 2, sight: 4 })
      .right({ i: 5, sight: 3 })
      .bottom({ i: 5, sight: 4 })
      .left({ i: 1, sight: 3 })
      .left({ i: 2, sight: 3 })
      .left({ i: 4, sight: 3 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 2, y: 4, height: 1 })
      .build();

    // When
    const actual = solve({ dimension: 6 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 2 })
      .set({ x: 0, y: 1, height: 4 })
      .set({ x: 0, y: 2, height: 1 })
      .set({ x: 0, y: 3, height: 6 })
      .set({ x: 0, y: 4, height: 3 })
      .set({ x: 0, y: 5, height: 5 })

      .set({ x: 1, y: 0, height: 4 })
      .set({ x: 1, y: 1, height: 3 })
      .set({ x: 1, y: 2, height: 5 })
      .set({ x: 1, y: 3, height: 1 })
      .set({ x: 1, y: 4, height: 2 })
      .set({ x: 1, y: 5, height: 6 })

      .set({ x: 2, y: 0, height: 5 })
      .set({ x: 2, y: 1, height: 2 })
      .set({ x: 2, y: 2, height: 6 })
      .set({ x: 2, y: 3, height: 4 })
      .set({ x: 2, y: 4, height: 1 })
      .set({ x: 2, y: 5, height: 3 })

      .set({ x: 3, y: 0, height: 6 })
      .set({ x: 3, y: 1, height: 1 })
      .set({ x: 3, y: 2, height: 4 })
      .set({ x: 3, y: 3, height: 3 })
      .set({ x: 3, y: 4, height: 5 })
      .set({ x: 3, y: 5, height: 2 })

      .set({ x: 4, y: 0, height: 1 })
      .set({ x: 4, y: 1, height: 5 })
      .set({ x: 4, y: 2, height: 3 })
      .set({ x: 4, y: 3, height: 2 })
      .set({ x: 4, y: 4, height: 6 })
      .set({ x: 4, y: 5, height: 4 })

      .set({ x: 5, y: 0, height: 3 })
      .set({ x: 5, y: 1, height: 6 })
      .set({ x: 5, y: 2, height: 2 })
      .set({ x: 5, y: 3, height: 5 })
      .set({ x: 5, y: 4, height: 4 })
      .set({ x: 5, y: 5, height: 1 })

      .build();
    expect(getResult(actual)).toEqual(expected);
  });

  test("Dimension 7", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .top({ i: 3, sight: 4 })
      .top({ i: 4, sight: 4 })
      .top({ i: 5, sight: 3 })
      .top({ i: 6, sight: 4 })
      .right({ i: 1, sight: 3 })
      .right({ i: 4, sight: 2 })
      .right({ i: 5, sight: 4 })
      .bottom({ i: 3, sight: 3 })
      .bottom({ i: 5, sight: 5 })
      .bottom({ i: 6, sight: 3 })
      .left({ i: 3, sight: 5 })
      .left({ i: 4, sight: 3 })
      .left({ i: 6, sight: 3 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 3, height: 1 })
      .set({ x: 4, y: 5, height: 4 })
      .set({ x: 5, y: 0, height: 4 })
      .set({ x: 6, y: 0, height: 2 })
      .build();

    // When
    const actual = solve({ dimension: 7 })(sight)(grid)({ verbosity: "silent" });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 5 })
      .set({ x: 0, y: 1, height: 7 })
      .set({ x: 0, y: 2, height: 2 })
      .set({ x: 0, y: 3, height: 1 })
      .set({ x: 0, y: 4, height: 4 })
      .set({ x: 0, y: 5, height: 6 })
      .set({ x: 0, y: 6, height: 3 })

      .set({ x: 1, y: 0, height: 7 })
      .set({ x: 1, y: 1, height: 4 })
      .set({ x: 1, y: 2, height: 1 })
      .set({ x: 1, y: 3, height: 3 })
      .set({ x: 1, y: 4, height: 2 })
      .set({ x: 1, y: 5, height: 5 })
      .set({ x: 1, y: 6, height: 6 })

      .set({ x: 2, y: 0, height: 6 })
      .set({ x: 2, y: 1, height: 1 })
      .set({ x: 2, y: 2, height: 3 })
      .set({ x: 2, y: 3, height: 2 })
      .set({ x: 2, y: 4, height: 5 })
      .set({ x: 2, y: 5, height: 7 })
      .set({ x: 2, y: 6, height: 4 })

      .set({ x: 3, y: 0, height: 1 })
      .set({ x: 3, y: 1, height: 5 })
      .set({ x: 3, y: 2, height: 6 })
      .set({ x: 3, y: 3, height: 4 })
      .set({ x: 3, y: 4, height: 7 })
      .set({ x: 3, y: 5, height: 3 })
      .set({ x: 3, y: 6, height: 2 })

      .set({ x: 4, y: 0, height: 3 })
      .set({ x: 4, y: 1, height: 2 })
      .set({ x: 4, y: 2, height: 5 })
      .set({ x: 4, y: 3, height: 6 })
      .set({ x: 4, y: 4, height: 1 })
      .set({ x: 4, y: 5, height: 4 })
      .set({ x: 4, y: 6, height: 7 })

      .set({ x: 5, y: 0, height: 4 })
      .set({ x: 5, y: 1, height: 6 })
      .set({ x: 5, y: 2, height: 7 })
      .set({ x: 5, y: 3, height: 5 })
      .set({ x: 5, y: 4, height: 3 })
      .set({ x: 5, y: 5, height: 2 })
      .set({ x: 5, y: 6, height: 1 })

      .set({ x: 6, y: 0, height: 2 })
      .set({ x: 6, y: 1, height: 3 })
      .set({ x: 6, y: 2, height: 4 })
      .set({ x: 6, y: 3, height: 7 })
      .set({ x: 6, y: 4, height: 6 })
      .set({ x: 6, y: 5, height: 1 })
      .set({ x: 6, y: 6, height: 5 })

      .build();
    expect(getResult(actual)).toEqual(expected);
  });
});

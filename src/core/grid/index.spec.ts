import {
  set,
  getX,
  transpose,
  electXCandidate,
  electYCandidate,
  isXComplete,
  isYComplete,
  GridBuilder,
  buildDisplayableGrid,
  display,
} from ".";
import { Skyline, Candidate } from "..";
import { SightBuilder } from "../sight";

describe("Test of set", () => {
  test("Set height at a given position", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 1 })
      .build();

    // When
    const actual = set(grid)({ x: 0, y: 1 })({ height: 2 });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .build();
    expect(actual).toEqual(expected);
  });
});

describe("Test of getX", () => {
  test("X is incomplete", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 2, height: 3 })
      .build();

    // When
    const actual = getX({ dimension: 4 })(grid)({ x: 0 });

    // Then
    const expected = undefined;
    expect(actual).toEqual(expected);
  });

  test("X is incomplete", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 3, height: 4 })
      .build();

    // When
    const actual = getX({ dimension: 4 })(grid)({ x: 0 });

    // Then
    const expected = undefined;
    expect(actual).toEqual(expected);
  });

  test("X is complete", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 3 })
      .set({ x: 0, y: 3, height: 4 })
      .build();

    // When
    const actual = getX({ dimension: 4 })(grid)({ x: 0 });

    // Then
    const expected: Skyline = [1, 2, 3, 4];
    expect(actual).toEqual(expected);
  });
});

describe("Test of transpose", () => {
  test("Empty grid", () => {
    // Given
    const grid = new GridBuilder().build();

    // When
    const actual = transpose(grid);

    // Then
    const expected = new GridBuilder().build();
    expect(actual).toEqual(expected);
  });

  test("Dimension 1", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = transpose(grid);

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();
    expect(actual).toEqual(expected);
  });

  test("Dimension 2", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 0, y: 1, height: 3 })
      .build();

    // When
    const actual = transpose(grid);

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 1, y: 0, height: 3 })
      .set({ x: 0, y: 1, height: 2 })
      .build();
    expect(actual).toEqual(expected);
  });
});

describe("Test of electXCandidate", () => {
  test("Unique test case", () => {
    // Given
    const candidate: Candidate = [1, 2, 3];
    const grid = new GridBuilder().build();

    // When
    const actual = electXCandidate(grid)(candidate)({ x: 0 });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 3 })
      .build();
    expect(actual).toEqual(expected);
  });
});

describe("Test of electYCandidate", () => {
  test("Unique test case", () => {
    // Given
    const candidate: Candidate = [1, 2, 3];
    const grid = new GridBuilder().build();

    // When
    const actual = electYCandidate(grid)(candidate)({ y: 0 });

    // Then
    const expected = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 2, y: 0, height: 3 })
      .build();
    expect(actual).toEqual(expected);
  });
});

describe("Test of isXComplete", () => {
  test("Not completed", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 3 })
      .build();

    // When
    // Then
    expect(isXComplete({ dimension: 4 })(grid)({ x: 0 })).toEqual(false);
  });

  test("Completed", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 0, y: 2, height: 3 })
      .set({ x: 0, y: 3, height: 4 })
      .build();

    // When
    // Then
    expect(isXComplete({ dimension: 4 })(grid)({ x: 0 })).toEqual(true);
  });
});

describe("Test of isYComplete", () => {
  test("Not completed", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 2, y: 0, height: 3 })
      .build();

    // When
    // Then
    expect(isYComplete({ dimension: 4 })(grid)({ y: 0 })).toEqual(false);
  });

  test("Completed", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 1, y: 0, height: 2 })
      .set({ x: 2, y: 0, height: 3 })
      .set({ x: 3, y: 0, height: 4 })
      .build();

    // When
    // Then
    expect(isYComplete({ dimension: 4 })(grid)({ y: 0 })).toEqual(true);
  });
});

describe("Test of buildDisplayableGrid", () => {
  test("Empty grid", () => {
    // Given
    const grid = new GridBuilder().build();

    // When
    const actual = buildDisplayableGrid({ dimension: 1 })(grid);

    // Then
    const expected: string[][] = [[" _ "]];
    expect(actual).toEqual(expected);
  });

  test("Non-empty grid", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = buildDisplayableGrid({ dimension: 1 })(grid);

    // Then
    const expected: string[][] = [[" 1 "]];
    expect(actual).toEqual(expected);
  });

  test("[Triangulation] Non-empty grid", () => {
    // Given
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .build();

    // When
    const actual = buildDisplayableGrid({ dimension: 2 })(grid);

    // Then
    const expected: string[][] = [
      [" 1 ", " _ "],
      [" 2 ", " _ "],
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of display", () => {
  test("With top sight", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = display({ dimension: 2 })(sight)(grid);

    // Then
    const expected: string = `    (2)        
     1   _     
     _   _     
               `;
    expect(actual).toEqual(expected);
  });

  test("With bottom sight", () => {
    // Given
    const sight = new SightBuilder() //
      .bottom({ i: 0, sight: 1 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = display({ dimension: 2 })(sight)(grid);

    // Then
    const expected: string = `               
     1   _     
     _   _     
    (1)        `;
    expect(actual).toEqual(expected);
  });

  test("With left sight", () => {
    // Given
    const sight = new SightBuilder() //
      .left({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = display({ dimension: 2 })(sight)(grid);

    // Then
    const expected: string = `               
(2)  1   _     
     _   _     
               `;
    expect(actual).toEqual(expected);
  });

  test("With right sight", () => {
    // Given
    const sight = new SightBuilder() //
      .right({ i: 0, sight: 1 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .build();

    // When
    const actual = display({ dimension: 2 })(sight)(grid);

    // Then
    const expected: string = `               
     1   _  (1)
     _   _     
               `;
    expect(actual).toEqual(expected);
  });

  test("All together", () => {
    // Given
    const sight = new SightBuilder() //
      .top({ i: 0, sight: 2 })
      .right({ i: 0, sight: 1 })
      .bottom({ i: 0, sight: 1 })
      .left({ i: 0, sight: 2 })
      .build();
    const grid = new GridBuilder() //
      .set({ x: 0, y: 0, height: 1 })
      .set({ x: 0, y: 1, height: 2 })
      .set({ x: 1, y: 1, height: 1 })
      .build();

    // When
    const actual = display({ dimension: 2 })(sight)(grid);

    // Then
    const expected: string = `    (2)        
(2)  1   _  (1)
     2   1     
    (1)        `;
    expect(actual).toEqual(expected);
  });
});

import { Skyscraper, Height, Skyline, Candidate } from "..";
import { FullSight, OneSideSight } from "../sight";

export type Coordinates = { x: number; y: number };

export type SerializedCoordinates = `${number}|${number}`;

export type Grid = Map<SerializedCoordinates, Skyscraper>;

export class GridBuilder {
  private grid: Grid = new Map();

  set = ({ x, y, height }: Coordinates & { height: number }) => {
    this.grid.set(serialize({ x, y }), height);
    return this;
  };

  build = () => this.grid;
}

export const serialize = ({ x, y }: Coordinates): SerializedCoordinates => `${x}|${y}`;

export const deserialize = (position: SerializedCoordinates): Coordinates => {
  const [x, y] = position.split("|").map(Number);
  return { x, y };
};

export const set =
  (grid: Grid) =>
  (position: Coordinates) =>
  ({ height }: { height: Height }): Grid =>
    new Map(grid).set(serialize(position), height);

export const getX =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ x }: { x: number }): Skyline =>
    [...new Array(dimension)].reduce((result, _, y) => {
      if (result === undefined) {
        return undefined;
      }

      const key = serialize({ x, y });

      if (grid.has(key)) {
        return [...result, grid.get(key)];
      }

      return undefined;
    }, []);

export const transpose = (grid: Grid): Grid => {
  const result = new Map();

  grid.forEach((value, key) => {
    const { x, y } = deserialize(key);
    result.set(serialize({ x: y, y: x }), value);
  });

  return result;
};

export const electXCandidate =
  (grid: Grid) =>
  (candidate: Candidate) =>
  ({ x }: { x: number }): Grid =>
    candidate.reduce((grid, height, y) => new Map(grid).set(serialize({ x, y }), height), grid);

export const electYCandidate =
  (grid: Grid) =>
  (candidate: Candidate) =>
  ({ y }: { y: number }): Grid =>
    candidate.reduce((grid, height, x) => new Map(grid).set(serialize({ x, y }), height), grid);

export const isXComplete =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ x }: { x: number }): boolean =>
    [...new Array(dimension)].reduce((result, _, y) => result && grid.has(serialize({ x, y })), true);

export const isYComplete =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ y }: { y: number }): boolean =>
    [...new Array(dimension)].reduce((result, _, x) => result && grid.has(serialize({ x, y })), true);

const EMPTY = "   ";

const EMPTY_BLOCK = " _ ";

const displaySight = (count: number): string => `(${count})`;

export const buildDisplayableGrid =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid): string[][] =>
    [...new Array(dimension)].map((_, y) =>
      [...new Array(dimension)].map((_, x) => {
        const key = serialize({ x, y });

        if (grid.has(key)) {
          return ` ${grid.get(key)} `;
        }

        return EMPTY_BLOCK;
      }),
    );

export const display =
  ({ dimension }: { dimension: number }) =>
  ({ top, bottom, left, right }: FullSight) =>
  (grid: Grid): string => {
    let result = buildDisplayableGrid({ dimension })(grid);

    const buildXSight = (sight: OneSideSight): string[] => {
      const result = [...new Array(dimension)].map(() => EMPTY);

      sight.forEach((count, x) => {
        result[x] = displaySight(count);
      });

      return result;
    };

    result = [buildXSight(top), ...result];

    result = [...result, buildXSight(bottom)];

    const buildYSight = (sight: OneSideSight): string[] => {
      const result = [...new Array(dimension)].map(() => EMPTY);

      sight.forEach((count, y) => {
        result[y] = displaySight(count);
      });

      return [EMPTY, ...result, EMPTY];
    };

    result = result.map((row, y) => [buildYSight(left)[y], ...row]);

    result = result.map((row, y) => [...row, buildYSight(right)[y]]);

    return result.map((row) => row.join(" ")).join("\n");
  };

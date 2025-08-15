import { Grid, serialize } from "../core/grid";
import { FullSight } from "../core/sight";
import { sum } from "../utils/sum";

type Direction = "x" | "y";

type Step = {
  direction: Direction;
  index: number;
};

export type ExecutionPlan = Step[];

type Constraints = {
  sights: [] | [number] | [number, number];
  values: number;
};

type EnhancedStep = Step & {
  constraints: Constraints;
};

type EnhancedExecutionPlan = EnhancedStep[];

const computeXNumberOfValues =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ x }: { x: number }): number =>
    [...new Array(dimension)].reduce((count, _, y) => {
      const key = serialize({ x, y });

      if (grid.has(key)) {
        return count + 1;
      }

      return count;
    }, 0);

const computeYNumberOfValues =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ y }: { y: number }): number =>
    [...new Array(dimension)].reduce((count, _, x) => {
      const key = serialize({ x, y });

      if (grid.has(key)) {
        return count + 1;
      }

      return count;
    }, 0);

const byDiminishingConstraint = (first: EnhancedStep, second: EnhancedStep): number => {
  if (first.constraints.sights.length === second.constraints.sights.length) {
    if (first.constraints.sights.length === 0) {
      return second.constraints.values - first.constraints.values;
    }

    const max1 = Math.max(...first.constraints.sights);
    const max2 = Math.max(...second.constraints.sights);

    if (max1 === max2) {
      const sum1 = sum(...first.constraints.sights);
      const sum2 = sum(...second.constraints.sights);

      if (sum1 === sum2) {
        return second.constraints.values - first.constraints.values;
      }

      return sum2 - sum1;
    }

    return max2 - max1;
  }

  return second.constraints.sights.length - first.constraints.sights.length;
};

const removeConstraints = ({ direction, index }: EnhancedStep): Step => ({ direction, index });

export const generateExecutionPlan =
  ({ dimension }: { dimension: number }) =>
  ({ top, bottom, left, right }: FullSight) =>
  (grid: Grid): ExecutionPlan => {
    const allIndexes = [...new Array(dimension)].map((_, i) => i);

    const xSteps: EnhancedExecutionPlan = allIndexes.map((index) => {
      const values = computeXNumberOfValues({ dimension })(grid)({ x: index });

      if (top.has(index) && bottom.has(index)) {
        return {
          direction: "x",
          index,
          constraints: {
            sights: [top.get(index), bottom.get(index)],
            values,
          },
        };
      }

      if (top.has(index) || bottom.has(index)) {
        return {
          direction: "x",
          index,
          constraints: {
            sights: [top.get(index) || bottom.get(index)],
            values,
          },
        };
      }

      return {
        direction: "x",
        index,
        constraints: {
          sights: [],
          values,
        },
      };
    });

    const ySteps: EnhancedExecutionPlan = allIndexes.map((index) => {
      const values = computeYNumberOfValues({ dimension })(grid)({ y: index });

      if (left.has(index) && right.has(index)) {
        return {
          direction: "y",
          index,
          constraints: {
            sights: [left.get(index), right.get(index)],
            values,
          },
        };
      }

      if (left.has(index) || right.has(index)) {
        return {
          direction: "y",
          index,
          constraints: {
            sights: [left.get(index) || right.get(index)],
            values,
          },
        };
      }

      return {
        direction: "y",
        index,
        constraints: {
          sights: [],
          values,
        },
      };
    });

    const result = [...xSteps, ...ySteps];

    result.sort(byDiminishingConstraint);

    return result.map(removeConstraints);
  };

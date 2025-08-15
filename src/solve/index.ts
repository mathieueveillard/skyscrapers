import { Candidates, reverse } from "../core";
import { Grid, isXComplete, electXCandidate, display, isYComplete, electYCandidate, serialize } from "../core/grid";
import { FullSight, OppositeSights } from "../core/sight";
import { memoizedGenerateCandidates as generateCandidates } from "../generateCandidates";
import {
  memoizedGenerateCandidatesWithoutSight,
  PartialSkyline,
} from "../generateCandidates/generateCandidatesWithoutSight";
import { generateExecutionPlan } from "../generateExecutionPlan";
import { filterOnXCompatibleCandidates, filterOnYCompatibleCandidates } from "../isValidCandidate";
import { defaultOptions } from "../utils/defaultOptions";
import { createLogger, Verbosity } from "../utils/logger";
import { error, isSuccess, Result, success } from "../utils/result";

const INVALID_GRID = "Invalid grid";

type Options = {
  verbosity: Verbosity;
};

const DEFAULT_OPTIONS: Options = {
  verbosity: "silent",
};

const getX =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ x }: { x: number }): PartialSkyline =>
    [...new Array(dimension)].map((_, y) => grid.get(serialize({ x, y })));

const getY =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ y }: { y: number }): PartialSkyline =>
    [...new Array(dimension)].map((_, x) => grid.get(serialize({ x, y })));

const optimizedGenerateCandidates =
  ({ dimension }: { dimension: number }) =>
  ({ sight, oppositeSight }: OppositeSights) =>
  ({ index }: { index: number }) =>
  (skyline: PartialSkyline): Candidates => {
    if (sight.has(index) && oppositeSight.has(index)) {
      if (sight.get(index) > oppositeSight.get(index)) {
        return generateCandidates({ dimension })({ sight: sight.get(index) });
      }

      return generateCandidates({ dimension })({ sight: oppositeSight.get(index) }).map(reverse);
    }

    if (sight.has(index)) {
      return generateCandidates({ dimension })({ sight: sight.get(index) });
    }

    if (oppositeSight.has(index)) {
      return generateCandidates({ dimension })({ sight: oppositeSight.get(index) }).map(reverse);
    }

    return memoizedGenerateCandidatesWithoutSight({ dimension })(skyline);
  };

export const solve =
  ({ dimension }: { dimension: number }) =>
  (sight: FullSight) =>
  (grid: Grid) =>
  (options: Options): Result<Grid> => {
    const defaultedOptions = defaultOptions(DEFAULT_OPTIONS)(options);

    const { verbosity } = defaultedOptions;

    const { log, print } = createLogger(verbosity);

    const internal =
      ({ dimension }: { dimension: number }) =>
      (sight: FullSight) =>
      (grid: Grid): Result<Grid> => {
        log("\n-----------------------------\n", "explain");
        log(display({ dimension })(sight)(grid), "explain");

        if (grid.size === dimension * dimension) {
          log(display({ dimension })(sight)(grid), "result");
          return success(grid);
        }

        const plan = generateExecutionPlan({ dimension })(sight)(grid);

        const { top, bottom, left, right } = sight;

        for (const { direction, index } of plan) {
          switch (direction) {
            case "x": {
              const x = index;

              if (isXComplete({ dimension })(grid)({ x })) {
                continue;
              }

              const skyline = getX({ dimension })(grid)({ x });

              let candidates = optimizedGenerateCandidates({ dimension })({ sight: top, oppositeSight: bottom })({
                index: x,
              })(skyline);

              candidates = filterOnXCompatibleCandidates({ sight })(grid)({ x })(candidates);

              log(`\nx=${x}: ${candidates.length} candidate(s).`, "explain");

              if (candidates.length === 0) {
                return error(INVALID_GRID);
              }

              for (const candidate of candidates) {
                log(`\nx=${x}: [${candidate.join(" ")}]`, "explain");

                const nextGrid = electXCandidate(grid)(candidate)({ x });

                const result = internal({ dimension })(sight)(nextGrid);

                if (isSuccess(result)) {
                  return result;
                }
              }

              return error(INVALID_GRID);
            }

            case "y": {
              const y = index;

              if (isYComplete({ dimension })(grid)({ y })) {
                continue;
              }

              const skyline = getY({ dimension })(grid)({ y });

              let candidates = optimizedGenerateCandidates({ dimension })({ sight: left, oppositeSight: right })({
                index: y,
              })(skyline);

              candidates = filterOnYCompatibleCandidates({ sight })(grid)({ y })(candidates);

              log(`\ny=${y}: ${candidates.length} candidate(s).`, "explain");

              if (candidates.length === 0) {
                return error(INVALID_GRID);
              }

              for (const candidate of candidates) {
                log(`\ny=${y}: [${candidate.join(" ")}]`, "explain");

                const nextGrid = electYCandidate(grid)(candidate)({ y });

                const result = internal({ dimension })(sight)(nextGrid);

                if (isSuccess(result)) {
                  return result;
                }
              }

              return error(INVALID_GRID);
            }
          }
        }

        return error(INVALID_GRID);
      };

    print();

    return internal({ dimension })(sight)(grid);
  };

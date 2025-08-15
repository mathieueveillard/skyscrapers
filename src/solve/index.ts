import { Candidates, reverse } from "../core";
import { Grid, isXComplete, electXCandidate, display, isYComplete, electYCandidate } from "../core/grid";
import { FullSight, OppositeSights } from "../core/sight";
import {
  memoizedGenerateCandidates as generateCandidates,
  dangerouslyGenerateAllPossibleCandidates,
} from "../generateCandidates";
import { generateExecutionPlan } from "../generateExecutionPlan";
import { filterOnXCompatibleCandidates, filterOnYCompatibleCandidates } from "../isValidCandidate";
import { defaultOptions } from "../utils/defaultOptions";
import { error, isSuccess, Result, success } from "../utils/result";

const INVALID_GRID = "Invalid grid";

type Options = {
  verbosity: "silent" | "result" | "explain";
};

const DEFAULT_OPTIONS: Options = {
  verbosity: "silent",
};

const optimizedGenerateCandidates =
  ({ dimension }: { dimension: number }) =>
  ({ sight, oppositeSight }: OppositeSights) =>
  ({ index }: { index: number }): Candidates => {
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

    return dangerouslyGenerateAllPossibleCandidates({ dimension });
  };

export const solve =
  ({ dimension }: { dimension: number }) =>
  (sight: FullSight) =>
  (grid: Grid) =>
  (options: Options): Result<Grid> => {
    const defaultedOptions = defaultOptions(DEFAULT_OPTIONS)(options);

    const { verbosity } = defaultedOptions;

    if (verbosity === "explain") {
      console.log("\n-----------------------------\n");
      console.log(display({ dimension })(sight)(grid));
    }

    if (grid.size === dimension * dimension) {
      if (verbosity === "result") {
        console.log(display({ dimension })(sight)(grid));
      }
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

          let candidates = optimizedGenerateCandidates({ dimension })({ sight: top, oppositeSight: bottom })({
            index: x,
          });

          candidates = filterOnXCompatibleCandidates({ sight })(grid)({ x })(candidates);

          if (verbosity === "explain") {
            console.log(`\nx=${x}: ${candidates.length} candidate(s).`);
          }

          if (candidates.length === 0) {
            return error(INVALID_GRID);
          }

          for (const candidate of candidates) {
            const nextGrid = electXCandidate(grid)(candidate)({ x });

            const result = solve({ dimension })(sight)(nextGrid)(defaultedOptions);

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

          let candidates = optimizedGenerateCandidates({ dimension })({ sight: left, oppositeSight: right })({
            index: y,
          });

          candidates = filterOnYCompatibleCandidates({ sight })(grid)({ y })(candidates);

          if (verbosity === "explain") {
            console.log(`\ny=${y}: ${candidates.length} candidate(s).`);
          }

          if (candidates.length === 0) {
            return error(INVALID_GRID);
          }

          for (const candidate of candidates) {
            const nextGrid = electYCandidate(grid)(candidate)({ y });

            const result = solve({ dimension })(sight)(nextGrid)(defaultedOptions);

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

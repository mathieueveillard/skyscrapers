import { Candidate, Candidates, reverse } from "../core";
import { Grid, transpose, Coordinates, serialize, set, getX } from "../core/grid";
import { Sight, FullSight, transposeFullSight, OneSideSight, matchesSight, OppositeSights } from "../core/sight";

export const filterWithSight =
  ({ sight }: { sight: Sight }) =>
  (candidates: Candidates): Candidates =>
    candidates.filter(matchesSight({ sight }));

export const filterWithOppositeSight =
  ({ sight }: { sight: Sight }) =>
  (candidates: Candidates): Candidates =>
    candidates.filter((candidate) => matchesSight({ sight })(reverse(candidate)));

export const isXValidCandidate =
  ({ sight }: { sight: FullSight }) =>
  (grid: Grid) =>
  ({ x }: { x: number }) =>
  (candidate: Candidate): boolean =>
    isYValidCandidate({ sight: transposeFullSight(sight) })(transpose(grid))({ y: x })(candidate);

export const filterOnXCompatibleCandidates =
  ({ sight }: { sight: FullSight }) =>
  (grid: Grid) =>
  ({ x }: { x: number }) =>
  (candidates: Candidates): Candidates =>
    candidates.filter(isXValidCandidate({ sight })(grid)({ x }));

const isCompatibleWithSightAndOppositeSights =
  ({ sight, oppositeSight }: OppositeSights) =>
  (candidate: Candidate) =>
  (i: number): boolean => {
    if (sight.has(i) && !matchesSight({ sight: sight.get(i) })(candidate)) {
      return false;
    }

    if (oppositeSight.has(i) && !matchesSight({ sight: oppositeSight.get(i) })(reverse(candidate))) {
      return false;
    }

    return true;
  };

const isValidSequenceOfHeights =
  ({ dimension }: { dimension: number }) =>
  (grid: Grid) =>
  ({ height }: { height: number }) =>
  ({ x, y }: Coordinates): boolean => {
    return [...new Array(dimension)].reduce((accumulator, _, yy) => {
      const skycraper = grid.get(serialize({ x, y: yy }));

      if (!skycraper) {
        return accumulator;
      }

      if (yy === y) {
        if (skycraper !== height) {
          return false;
        }

        return accumulator;
      }

      if (skycraper === height) {
        return false;
      }

      return accumulator;
    }, true);
  };

export const isYValidCandidate =
  ({ sight }: { sight: FullSight }) =>
  (grid: Grid) =>
  ({ y }: { y: number }) =>
  (candidate: Candidate): boolean => {
    if (!isCompatibleWithSightAndOppositeSights({ sight: sight.left, oppositeSight: sight.right })(candidate)(y)) {
      return false;
    }

    const dimension = candidate.length;

    return [...new Array(dimension)].reduce(
      (accumulator, _, x) =>
        accumulator &&
        isValidSequenceOfHeights({ dimension })(grid)({ height: candidate[x] })({ x, y }) &&
        (() => {
          const nextGrid = set(grid)({ x, y })({ height: candidate[x] });

          const sideCandidate = getX({ dimension })(nextGrid)({ x });

          if (!sideCandidate) {
            return true;
          }

          return isCompatibleWithSightAndOppositeSights({ sight: sight.top, oppositeSight: sight.bottom })(
            sideCandidate,
          )(x);
        })(),
      true,
    );
  };

export const filterOnYCompatibleCandidates =
  ({ sight }: { sight: FullSight }) =>
  (grid: Grid) =>
  ({ y }: { y: number }) =>
  (candidates: Candidates): Candidates =>
    candidates.filter(isYValidCandidate({ sight })(grid)({ y }));

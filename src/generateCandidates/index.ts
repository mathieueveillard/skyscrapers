import { Candidate, Candidates, serialize, Skyline } from "../core";
import { matchesSight, Sight } from "../core/sight";

export const swap =
  (candidate: Candidate) =>
  ({ index }: { index: number }): Candidate => {
    const dimension = candidate.length;

    if (dimension === 0 || dimension === 1 || index === dimension - 1) {
      return candidate;
    }

    const next = [...candidate];

    const temp = candidate[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;

    return next;
  };

export const swapN =
  (candidate: Candidate) =>
  ({ index, times }: { index: number; times: number }): Candidate => {
    if (times === 1) {
      return swap(candidate)({ index });
    }

    return swapN(swap(candidate)({ index }))({ index: index + 1, times: times - 1 });
  };

export const hide = (candidate: Candidate): Candidates => {
  const dimension = candidate.length;

  if (dimension <= 1) {
    return [candidate];
  }

  if (dimension > 1) {
    return [...Array(dimension - 1)]
      .map((_, index) =>
        [...Array(dimension - 1 - index)].map((_, times) => swapN(candidate)({ index, times: times + 1 })),
      )
      .flat();
  }
};

const generateCandidatesRecursively =
  ({ depth }: { depth: number }) =>
  (candidate: Candidate): Candidates => {
    if (depth === 0) {
      return [candidate];
    }

    return hide(candidate)
      .map(generateCandidatesRecursively({ depth: depth - 1 }))
      .flat();
  };

const unique = (candidates: Candidates): Candidates => {
  const set = new Map<string, Candidate>();

  return candidates.filter((candidate) => {
    const key = serialize(candidate);

    if (!set.has(key)) {
      set.set(key, candidate);
      return true;
    }

    return false;
  });
};

export const generateCandidates =
  ({ dimension }: { dimension: number }) =>
  ({ sight }: { sight: Sight }): Candidates => {
    const actualSight = dimension;

    const targetSight = sight;

    const defaultSkyline: Skyline = [...new Array(dimension)].map((_, i) => i + 1);

    const candidates = generateCandidatesRecursively({ depth: actualSight - targetSight })(defaultSkyline);

    return unique(candidates).filter(matchesSight({ sight: targetSight }));
  };

const memoize = () => {
  const map = new Map<string, Candidates>();

  return ({ dimension }: { dimension: number }) =>
    ({ sight }: { sight: Sight }): Candidates => {
      const key = `${dimension}|${sight}`;

      if (map.has(key)) {
        return map.get(key);
      }

      const value = generateCandidates({ dimension })({ sight });

      map.set(key, value);

      return value;
    };
};

export const memoizedGenerateCandidates = memoize();

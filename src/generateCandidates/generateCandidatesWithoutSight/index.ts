import { Candidates, Height } from "../../core";

export type PartialSkyline = (undefined | Height)[];

export const identifyMissingHeights =
  ({ dimension }: { dimension: number }) =>
  (skyline: PartialSkyline): Height[] => {
    const set = new Set();

    skyline.forEach((height) => {
      set.add(height);
    });

    return [...new Array(dimension)]
      .map((_, i) => i + 1)
      .reduce((acc, height) => {
        if (!set.has(height)) {
          return [...acc, height];
        }

        return acc;
      }, []);
  };

export const generateAllPermutations = (values: number[]): number[][] => {
  if (values.length === 1) {
    return [values];
  }

  return values
    .map((value, index) => {
      const others = [...values];
      others.splice(index, 1);
      return generateAllPermutations(others).map((permutation) => [value, ...permutation]);
    })
    .flat();
};

export const bundle =
  (skyline: PartialSkyline) =>
  (permutations: Height[][]): Candidates => {
    const missingIndexes: number[] = skyline.reduce((acc, height, index) => {
      if (height === undefined) {
        return [...acc, index];
      }
      return acc;
    }, []);

    return permutations.map((permutation) =>
      permutation.reduce(
        (candidate, height, index) => {
          candidate[missingIndexes[index]] = height;
          return candidate;
        },
        [...skyline],
      ),
    );
  };

export const generateCandidatesWithoutSight =
  ({ dimension }: { dimension: number }) =>
  (skyline: PartialSkyline): Candidates => {
    const missingHeights = identifyMissingHeights({ dimension })(skyline);

    const permutations = generateAllPermutations(missingHeights);

    return bundle(skyline)(permutations);
  };

const memoize = () => {
  const map = new Map<string, Candidates>();

  return ({ dimension }: { dimension: number }) =>
    (skyline: PartialSkyline): Candidates => {
      const key = `${dimension}|${skyline.join(",")}`;

      if (map.has(key)) {
        return map.get(key);
      }

      const value = generateCandidatesWithoutSight({ dimension })(skyline);

      map.set(key, value);

      return value;
    };
};

export const memoizedGenerateCandidatesWithoutSight = memoize();

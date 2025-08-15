import { Skyline, Candidate, serialize } from "..";

export type Sight = number;

export type OneSideSight = Map<number, Sight>;

export type OppositeSights = {
  sight: OneSideSight;
  oppositeSight: OneSideSight;
};

export type FullSight = {
  top: OneSideSight;
  right: OneSideSight;
  bottom: OneSideSight;
  left: OneSideSight;
};

export class SightBuilder {
  private sight: FullSight = {
    top: new Map(),
    right: new Map(),
    bottom: new Map(),
    left: new Map(),
  };

  top = ({ i, sight }: { i: number; sight: number }) => {
    this.sight.top.set(i, sight);
    return this;
  };

  right = ({ i, sight }: { i: number; sight: number }) => {
    this.sight.right.set(i, sight);
    return this;
  };

  bottom = ({ i, sight }: { i: number; sight: number }) => {
    this.sight.bottom.set(i, sight);
    return this;
  };

  left = ({ i, sight }: { i: number; sight: number }) => {
    this.sight.left.set(i, sight);
    return this;
  };

  build = () => this.sight;
}

export const transposeFullSight = ({ top, right, bottom, left }: FullSight): FullSight => ({
  top: left,
  right: bottom,
  bottom: right,
  left: top,
});

type EnhancedSight = { maxHeight: number; sight: number };

const computeSightRecursively =
  (enhancedSight: EnhancedSight) =>
  (skyline: Skyline): EnhancedSight => {
    if (skyline.length === 0) {
      return enhancedSight;
    }

    const { maxHeight, sight } = enhancedSight;

    const [next, ...rest] = skyline;

    if (next <= maxHeight) {
      return computeSightRecursively(enhancedSight)(rest);
    }

    return computeSightRecursively({ maxHeight: next, sight: sight + 1 })(rest);
  };

export const computeSight = (skyline: Skyline): Sight => {
  return computeSightRecursively({ maxHeight: 0, sight: 0 })(skyline).sight;
};

const memoize = () => {
  const map = new Map<string, Sight>();

  return (skyline: Skyline): Sight => {
    const key = serialize(skyline);

    if (map.has(key)) {
      return map.get(key);
    }

    const value = computeSight(skyline);

    map.set(key, value);

    return value;
  };
};

const memoizedComputeSight = memoize();

export const matchesSight =
  ({ sight: targetSight }: { sight: Sight }) =>
  (candidate: Candidate): boolean =>
    memoizedComputeSight(candidate) === targetSight;

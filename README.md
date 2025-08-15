# skyscrapers

## Rules & examples

- https://fr.wikipedia.org/wiki/Jeu_du_gratte-ciel
- https://fr.puzzle-skyscrapers.com/

## Demo

```typescript
import { GridBuilder } from "./core/grid";
import { SightBuilder } from "./core/sight";
import { solve } from "./solve";

const sight = new SightBuilder() //
  .right({ i: 1, sight: 4 })
  .bottom({ i: 1, sight: 2 })
  .bottom({ i: 3, sight: 4 })
  .left({ i: 0, sight: 2 })
  .left({ i: 2, sight: 2 })
  .left({ i: 3, sight: 4 })
  .build();

const grid = new GridBuilder().build();

solve({ dimension: 5 })(sight)(grid)({ verbosity: "explain" });
```

```
npm run example
```

```
(2)  _   _   _   _   _
     _   _   _   _   _  (4)
(2)  _   _   _   _   _
(4)  _   _   _   _   _
     _   _   _   _   _
        (2)     (4)


x=3: 10 candidate(s).


x=3: [5 4 3 1 2]


-----------------------------



(2)  _   _   _   5   _
     _   _   _   4   _  (4)
(2)  _   _   _   3   _
(4)  _   _   _   1   _
     _   _   _   2   _
        (2)     (4)


y=1: 0 candidate(s).


x=3: [5 4 1 3 2]


-----------------------------



(2)  _   _   _   5   _
     _   _   _   4   _  (4)
(2)  _   _   _   1   _
(4)  _   _   _   3   _
     _   _   _   2   _
        (2)     (4)


y=1: 0 candidate(s).


x=3: [5 1 4 3 2]


-----------------------------



(2)  _   _   _   5   _
     _   _   _   1   _  (4)
(2)  _   _   _   4   _
(4)  _   _   _   3   _
     _   _   _   2   _
        (2)     (4)


y=1: 1 candidate(s).


y=1: [5 4 3 1 2]


-----------------------------



(2)  _   _   _   5   _
     5   4   3   1   2  (4)
(2)  _   _   _   4   _
(4)  _   _   _   3   _
     _   _   _   2   _
        (2)     (4)


y=3: 1 candidate(s).


y=3: [1 2 4 3 5]


-----------------------------



(2)  _   _   _   5   _
     5   4   3   1   2  (4)
(2)  _   _   _   4   _
(4)  1   2   4   3   5
     _   _   _   2   _
        (2)     (4)


x=1: 1 candidate(s).


x=1: [1 4 5 2 3]


-----------------------------



(2)  _   1   _   5   _
     5   4   3   1   2  (4)
(2)  _   5   _   4   _
(4)  1   2   4   3   5
     _   3   _   2   _
        (2)     (4)


y=0: 2 candidate(s).


y=0: [3 1 2 5 4]


-----------------------------



(2)  3   1   2   5   4
     5   4   3   1   2  (4)
(2)  _   5   _   4   _
(4)  1   2   4   3   5
     _   3   _   2   _
        (2)     (4)


y=2: 1 candidate(s).


y=2: [2 5 1 4 3]


-----------------------------



(2)  3   1   2   5   4
     5   4   3   1   2  (4)
(2)  2   5   1   4   3
(4)  1   2   4   3   5
     _   3   _   2   _
        (2)     (4)


x=0: 1 candidate(s).


x=0: [3 5 2 1 4]


-----------------------------



(2)  3   1   2   5   4
     5   4   3   1   2  (4)
(2)  2   5   1   4   3
(4)  1   2   4   3   5
     4   3   _   2   _
        (2)     (4)


x=2: 1 candidate(s).


x=2: [2 3 1 4 5]


-----------------------------



(2)  3   1   2   5   4
     5   4   3   1   2  (4)
(2)  2   5   1   4   3
(4)  1   2   4   3   5
     4   3   5   2   _
        (2)     (4)


x=4: 1 candidate(s).


x=4: [4 2 3 5 1]


-----------------------------



(2)  3   1   2   5   4
     5   4   3   1   2  (4)
(2)  2   5   1   4   3
(4)  1   2   4   3   5
     4   3   5   2   1
        (2)     (4)
```

## Performances

```
 PASS  src/solve/index.spec.ts (36.477 s)
  Test of solve
    ✓ Dimension 2 (5 ms)
    ✓ Dimension 3 (2 ms)
    ✓ Dimension 4 (normal) (8 ms)
    ✓ Dimension 4 (hard) (7 ms)
    ✓ Dimension 5 (normal) (45 ms)
    ✓ Dimension 5 (hard) (5 ms)
    ✓ Dimension 6 (normal) (2078 ms)
    ✓ Dimension 6 (hard) (7742 ms)
    ✓ Dimension 6 (Thomas Vuille) (1757 ms)
    ✓ Dimension 7 (22703 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        36.526 s
Ran all test suites matching /\/Users\/mathieueveillard\/Dev\/repositories\/skyscrapers\/src\/solve\/index.spec.ts/i with tests matching "Test of solve".
```

## Misc.

https://www.linkedin.com/posts/thomas-vuille_tdd-activity-7275971875300683779-6AgT?utm_source=share&utm_medium=member_desktop

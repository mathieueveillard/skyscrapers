# skyscrapers

## Rules & examples

- https://fr.wikipedia.org/wiki/Jeu_du_gratte-ciel
- https://fr.puzzle-skyscrapers.com/

## To do

Further optimizations:

- Make deterministic deductions when `sight === 1` or `sight === dimension`.
- Detect premature incompatibilities, even when line or column is not complete (e.g. `(1) 3 _ _ _` ➡️ KO, `(4) 2 _ _ _` ➡️ KO, `(4) _ 1 _ _` ➡️ KO, `(2) 4 _ _ _` ➡️ KO…)
- Implement another way to generate candidates, e.g. `2 _ _ 6 5 7 4` ➡️ `1 3` or `3 1`

## Demo

```typescript
// example.ts
import { GridBuilder } from "./core/grid";
import { SightBuilder } from "./core/sight";
import { solve } from "./solve";

const sight = new SightBuilder() //
  .top({ i: 0, sight: 2 })
  .right({ i: 0, sight: 3 })
  .right({ i: 3, sight: 4 })
  .bottom({ i: 3, sight: 1 })
  .bottom({ i: 4, sight: 3 })
  .left({ i: 2, sight: 2 })
  .left({ i: 4, sight: 2 })
  .build();

const grid = new GridBuilder().build();

solve({ dimension: 5 })(sight)(grid)({ verbosity: "explain" });
```

```
npm run example
```

```

    (2)
     _   _   _   _   _  (3)
     _   _   _   _   _
(2)  _   _   _   _   _
     _   _   _   _   _  (4)
(2)  _   _   _   _   _
                (1) (3)

y=3: 10 candidate(s).

-----------------------------

    (2)
     _   _   _   _   _  (3)
     _   _   _   _   _
(2)  _   _   _   _   _
     5   4   3   1   2  (4)
(2)  _   _   _   _   _
                (1) (3)

x=4: 5 candidate(s).

-----------------------------

    (2)
     _   _   _   _   5  (3)
     _   _   _   _   4
(2)  _   _   _   _   1
     5   4   3   1   2  (4)
(2)  _   _   _   _   3
                (1) (3)

y=0: 0 candidate(s).

-----------------------------

    (2)
     _   _   _   _   5  (3)
     _   _   _   _   1
(2)  _   _   _   _   4
     5   4   3   1   2  (4)
(2)  _   _   _   _   3
                (1) (3)

y=0: 0 candidate(s).

-----------------------------

    (2)
     _   _   _   _   1  (3)
     _   _   _   _   5
(2)  _   _   _   _   4
     5   4   3   1   2  (4)
(2)  _   _   _   _   3
                (1) (3)

y=0: 6 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     _   _   _   _   5
(2)  _   _   _   _   4
     5   4   3   1   2  (4)
(2)  _   _   _   _   3
                (1) (3)

x=0: 4 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     3   _   _   _   5
(2)  1   _   _   _   4
     5   4   3   1   2  (4)
(2)  2   _   _   _   3
                (1) (3)

y=2: 0 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     1   _   _   _   5
(2)  3   _   _   _   4
     5   4   3   1   2  (4)
(2)  2   _   _   _   3
                (1) (3)

y=2: 2 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     1   _   _   _   5
(2)  3   2   1   5   4
     5   4   3   1   2  (4)
(2)  2   _   _   _   3
                (1) (3)

y=4: 1 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     1   _   _   _   5
(2)  3   2   1   5   4
     5   4   3   1   2  (4)
(2)  2   1   5   4   3
                (1) (3)

x=3: 0 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     1   _   _   _   5
(2)  3   1   5   2   4
     5   4   3   1   2  (4)
(2)  2   _   _   _   3
                (1) (3)

y=4: 0 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     3   _   _   _   5
(2)  2   _   _   _   4
     5   4   3   1   2  (4)
(2)  1   _   _   _   3
                (1) (3)

y=2: 0 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     2   _   _   _   5
(2)  3   _   _   _   4
     5   4   3   1   2  (4)
(2)  1   _   _   _   3
                (1) (3)

y=2: 2 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     2   _   _   _   5
(2)  3   2   1   5   4
     5   4   3   1   2  (4)
(2)  1   _   _   _   3
                (1) (3)

y=4: 0 candidate(s).

-----------------------------

    (2)
     4   5   2   3   1  (3)
     2   _   _   _   5
(2)  3   1   5   2   4
     5   4   3   1   2  (4)
(2)  1   _   _   _   3
                (1) (3)

y=4: 0 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     _   _   _   _   5
(2)  _   _   _   _   4
     5   4   3   1   2  (4)
(2)  _   _   _   _   3
                (1) (3)

x=0: 2 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     2   _   _   _   5
(2)  1   _   _   _   4
     5   4   3   1   2  (4)
(2)  4   _   _   _   3
                (1) (3)

y=2: 0 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   _   _   _   5
(2)  2   _   _   _   4
     5   4   3   1   2  (4)
(2)  4   _   _   _   3
                (1) (3)

y=2: 1 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   _   _   _   5
(2)  2   1   5   3   4
     5   4   3   1   2  (4)
(2)  4   _   _   _   3
                (1) (3)

y=4: 1 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   _   _   _   5
(2)  2   1   5   3   4
     5   4   3   1   2  (4)
(2)  4   2   1   5   3
                (1) (3)

x=3: 1 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   _   _   2   5
(2)  2   1   5   3   4
     5   4   3   1   2  (4)
(2)  4   2   1   5   3
                (1) (3)

x=1: 1 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   3   _   2   5
(2)  2   1   5   3   4
     5   4   3   1   2  (4)
(2)  4   2   1   5   3
                (1) (3)

x=2: 1 candidate(s).

-----------------------------

    (2)
     3   5   2   4   1  (3)
     1   3   4   2   5
(2)  2   1   5   3   4
     5   4   3   1   2  (4)
(2)  4   2   1   5   3
                (1) (3)
```

## Performances

```
 PASS  src/solve/index.spec.ts (6.803 s)
  Test of solve
    ✓ Dimension 2 (3 ms)
    ✓ Dimension 3 (1 ms)
    ✓ Dimension 4 (normal) (5 ms)
    ✓ Dimension 4 (hard) (4 ms)
    ✓ Dimension 5 (normal) (24 ms)
    ✓ Dimension 5 (hard) (5 ms)
    ✓ Dimension 6 (normal) (2306 ms)
    ✓ Dimension 6 (hard) (3559 ms)
    ○ skipped Dimension 7

Test Suites: 1 passed, 1 total
Tests:       1 skipped, 8 passed, 9 total
Snapshots:   0 total
Time:        6.828 s
```

## Misc.

https://www.linkedin.com/posts/thomas-vuille_tdd-activity-7275971875300683779-6AgT?utm_source=share&utm_medium=member_desktop

```

```

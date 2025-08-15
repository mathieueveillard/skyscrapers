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

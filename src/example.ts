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

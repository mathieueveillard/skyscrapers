import { v4 as uuid } from "uuid";
import * as fs from "fs/promises";

export type Verbosity = "silent" | "result" | "explain";

type Logger = {
  log: (data: string, verbosity: Verbosity) => void;
  print: () => void;
};

const directory = "/Users/mathieueveillard/Dev/repositories/skyscrapers/logs";

export const createLogger = (verbosity: Verbosity): Logger => {
  switch (verbosity) {
    case "silent": {
      return {
        log: () => {},
        print: () => {},
      };
    }

    case "result": {
      return {
        log: (data, verbosity) => {
          if (verbosity === "result") {
            console.log(data);
          }
        },
        print: () => {},
      };
    }

    case "explain": {
      const id = uuid();

      const path = `${directory}/${id}.txt`;

      fs.writeFile(path, "");

      let queue = Promise.resolve();

      return {
        log: (data: string, verbosity: Verbosity) => {
          if (verbosity === "explain") {
            queue = queue.then(() => fs.appendFile(path, "\n\n" + data));
          }
        },
        print: () => {
          console.log(`Log file ➡ /logs/${id}.txt`);
        },
      };
    }
  }
};

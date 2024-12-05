import fs from "fs";
import path from "path";

import { CCGlobal } from "./cc-global";

export namespace Configuration {
  export const API_PORT = () => Number(CCGlobal.env.API_PORT);

  export const ROOT = () => {
    const splitted: string[] = __dirname.split(path.sep);

    return splitted.at(-1) === "src" && splitted.at(-2) === "bin"
      ? path.resolve(__dirname + "/../..")
      : fs.existsSync(__dirname + "/.env")
        ? __dirname
        : path.resolve(__dirname + "/..");
  };
}

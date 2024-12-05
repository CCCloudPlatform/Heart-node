import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia from "typia";

export class CCGlobal {
  public static get env(): CCGlobal.IEnvironments {
    return environments.get();
  }
}

export namespace CCGlobal {
  export interface IEnvironments {
    API_PORT: `${number}`;

    // Zipkin
    ZIPKIN_URL: string;
    ZIPKIN_SERVICE: string;
  }
}

const environments = new Singleton(() => {
  const env = dotenv.config({
    path: ".env.local",
  });
  dotenvExpand.expand(env);
  return typia.assert<CCGlobal.IEnvironments>(process.env);
});

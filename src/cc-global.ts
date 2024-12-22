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
    NODE_ENV: "local" | "dev" | "prod" | "test";

    API_PORT: `${number}`;

    // JWT
    USER_INFO_JWT_SECRET: string;

    // Zipkin
    ZIPKIN_URL: string;
    ZIPKIN_SERVICE: string;

    // Openstack
    OPENSTACK_USER_NAME: string;
    OPENSTACK_PASSWORD: string;
    OPENSTACK_AUTH_URL: string;
    OPENSTACK_DOMAIN: string;
    OPENSTACK_PROJECT_NAME: string;
  }
}

const environments = new Singleton(() => {
  const env = dotenv.config({
    path: ".env.local",
  });
  dotenvExpand.expand(env);
  return typia.assert<CCGlobal.IEnvironments>(process.env);
});

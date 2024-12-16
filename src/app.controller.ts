import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { CCGlobal } from "./cc-global";
import { diffDateString } from "./utils/functions/diff-date-string";

@Controller()
export class AppController {
  private readonly bootTime = new Date();
  private mode: string = CCGlobal.env.NODE_ENV;

  constructor() {}

  @core.TypedRoute.Get("health_check")
  async healthCheck() {
    const curTime = new Date();

    return {
      message: "I am OK! Have a nice day!!!",
      mode: this.mode,
      bootTime: this.bootTime,
      serverTime: curTime.toISOString(),
      uptime: diffDateString(curTime.getTime() - this.bootTime.getTime()),
      version: process.env.npm_package_version,
    };
  }

  async a() {
    console.log("hi")
  }
}

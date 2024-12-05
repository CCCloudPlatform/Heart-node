import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { Configuration } from "./configuration";

/**
 * Cloud Club Cloud PlatForm의 서버입니다.
 */
export class CCBackend {
  private application_?: INestApplication;

  public async open(): Promise<void> {
    this.application_ = await NestFactory.create(AppModule);

    this.application_.enableCors();

    await this.application_.listen(Configuration.API_PORT(), "0.0.0.0");
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    await this.application_.close();
    delete this.application_;
  }
}

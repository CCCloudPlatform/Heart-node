import { NestiaSwaggerComposer } from "@nestia/sdk";
import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { Configuration } from "./configuration";

/**
 * Cloud Club Cloud PlatForm의 서버입니다.
 */
export class CCBackend {
  private application_?: INestApplication;

  public async open(): Promise<void> {
    this.application_ = await NestFactory.create(AppModule);

    this.application_.setGlobalPrefix("/api", {
      exclude: ["/health_check"],
    });

    const document = await NestiaSwaggerComposer.document(this.application_, {
      openapi: "3.1",
      info: {
        title: "CCCloud Platform",
        summary: "VM Heart Service",
        description: "클라우드 클럽의 클라우드 플랫폼 Heart VM 서버입니다.",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local Server",
        },
      ],
      security: {
        userInfo: {
          type: "http",
          scheme: "bearer",
          description: "Container 인증을 위한 JWT",
        },
      },
    });

    SwaggerModule.setup("/api-docs", this.application_, document as any);

    this.application_.enableCors();

    await this.application_.listen(Configuration.API_PORT(), "0.0.0.0");
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    await this.application_.close();
    delete this.application_;
  }
}

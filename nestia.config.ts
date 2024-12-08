import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./src/app.module";

export const NESTIA_CONFIG: INestiaConfig = {
  input: async () => {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("/api", {
      exclude: ["/health_check"],
    });

    return app;
  },
  output: "src/api",
};

export default NESTIA_CONFIG;

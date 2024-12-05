import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { GLOBAL_FILTERS } from "./middlewares/filters/global.filter";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [...GLOBAL_FILTERS],
})
export class AppModule {}

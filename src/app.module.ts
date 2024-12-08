import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { GLOBAL_FILTERS } from "./middlewares/filters/global.filter";
import { VMModule } from "./res/vm/vm.module";

@Module({
  imports: [AuthModule, VMModule],
  controllers: [AppController],
  providers: [...GLOBAL_FILTERS],
})
export class AppModule {}

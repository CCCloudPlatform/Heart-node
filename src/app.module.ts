import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { OpenstackModule } from "./external/openstack/openstack.module";
import { GLOBAL_FILTERS } from "./middlewares/filters/global.filter";
import { VMModule } from "./res/vm/vm.module";

@Module({
  imports: [OpenstackModule, AuthModule, VMModule],
  controllers: [AppController],
  providers: [...GLOBAL_FILTERS],
})
export class AppModule {}

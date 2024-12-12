import { Global, Module } from "@nestjs/common";

import { OpenstackService } from "./openstack.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OpenstackService],
  exports: [OpenstackService],
})
export class OpenstackModule {}

import { OpenstackModule } from "@CCPlatform/external/openstack/openstack.module";
import { Module } from "@nestjs/common";

import { SGController } from "./security-group.controller";
import { SGService } from "./security-group.service";

@Module({
  imports: [OpenstackModule],
  controllers: [SGController],
  providers: [SGService],
})
export class SGModule {}

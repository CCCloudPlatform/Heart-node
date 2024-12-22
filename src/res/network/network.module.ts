import { OpenstackModule } from "@CCPlatform/external/openstack/openstack.module";
import { Module } from "@nestjs/common";

import { NetworkController } from "./network.controller";
import { NetworkService } from "./network.service";

@Module({
  imports: [OpenstackModule],
  controllers: [NetworkController],
  providers: [NetworkService],
})
export class NetworkModule {}

import { Module } from "@nestjs/common";

import { VMController } from "./vm.controller";
import { VMService } from "./vm.service";

@Module({
  imports: [],
  controllers: [VMController],
  providers: [VMService],
})
export class VMModule {}

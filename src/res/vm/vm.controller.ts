import { CCGlobal } from "@CCPlatform/cc-global";
import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import { VMResponse } from "@CCPlatform/dtos/vm/vm-response.dto";
import {
  User,
  UserDecoratorType,
} from "@CCPlatform/middlewares/decorators/user.decorator";
import {
  OpenstackRequest,
  OpenstackResponse,
} from "@CCPlatform/utils/types/auth/openstack";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import axios from "axios";
import typia, { tags } from "typia";
import { v4 as uuidv4 } from "uuid";

import { VMService } from "./vm.service";

@Controller("vm")
export class VMController {
  constructor(private readonly vmService: VMService) {}

  /**
   * Virtual Machine을 생성한다.
   * @tag VM
   * @summary VM 생성 API
   */
  @core.TypedRoute.Post("create")
  async createVM(
    @core.TypedBody() body: VMRequest.Body.CreateVM,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.CreateVM> {
    try {
      const res = await this.vmService.createVM(body);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * VM의 스냅샷을 생성한다.
   * @tag VM
   * @summary VM 스냅샷 생성 API
   * @security userInfo
   */
  @core.TypedRoute.Post(":vmId/snapshot")
  async createVMSnapshot(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVM> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * 유저의 VM 목록을 불러온다.
   * @tag VM
   * @summary VM 목록 불러오기 API
   * @security userInfo
   */
  @core.TypedRoute.Get("/list")
  async getVMList(
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVM> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * VM을 재시작한다.
   * @tag VM
   * @summary VM 재시작 API
   * @security userInfo
   */
  @core.TypedRoute.Patch(":vmId/restart")
  async restartVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.RestartVM> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * VM의 전원을 켠다.
   * @tag VM
   * @summary VM 전원 켜기 API
   * @security userInfo
   */
  @core.TypedRoute.Patch(":vmId/turn_on")
  async turnOnVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOnVM> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * VM의 전원을 끈다.
   * @tag VM
   * @summary VM 전원 끄기 API
   * @security userInfo
   */
  @core.TypedRoute.Patch(":vmId/turn_off")
  async turnOffVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVM> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }

  /**
   * VM을 강제종료한다. 동시에 삭제한다.
   * @tag VM
   * @summary VM 강제종료 API
   * @security userInfo
   */
  @core.TypedRoute.Delete(":vmId/turn_off/force")
  async turnOffVMForced(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVMForced> {
    return {
      id: uuidv4(),
      host: "host",
    };
  }
}

import { CCGlobal } from "@CCPlatform/cc-global";
import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import { VMResponse } from "@CCPlatform/dtos/vm/vm-response.dto";
import {
  User,
  UserDecoratorType,
} from "@CCPlatform/middlewares/decorators/user.decorator";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { tags } from "typia";

import { VMService } from "./vm.service";

@Controller("vm")
export class VMController {
  constructor(private readonly vmService: VMService) {}

  /**
   * Virtual Machine을 생성한다.
   * @tag VM
   * @summary VM 생성 API
   */
  @core.TypedRoute.Post()
  async createVM(
    @core.TypedBody() body: VMRequest.Body.CreateVM,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.CreateVM> {
    const res = await this.vmService.createVM(body);

    return res;
  }

  /**
   * VM의 스냅샷을 생성한다.
   * @tag VM
   * @summary VM 스냅샷 생성 API
   */
  @core.TypedRoute.Post(":vmId/snapshot")
  async createVMSnapshot(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @core.TypedBody() body: VMRequest.Body.CreateVMSnapshot,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.CreateVMSnapshot> {
    const res = await this.vmService.createVMSnapshot({
      snapshotName: body.snapshotName,
      vmId,
    });

    return res;
  }

  /**
   * 유저의 VM 목록을 불러온다.
   * @tag VM
   * @summary VM 목록 불러오기 API
   */
  @core.TypedRoute.Get("/list")
  async getVMList(
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.GetVMList> {
    const res = await this.vmService.getVMList();

    return res;
  }

  /**
   * VM을 재시작한다.
   * @tag VM
   * @summary VM 재시작 API
   */
  @core.TypedRoute.Patch(":vmId/restart")
  async restartVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @core.TypedBody() body: VMRequest.Body.RestartVM,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.RestartVM> {
    const res = await this.vmService.restartVM({
      vmId,
      type: body.type,
    });

    return res;
  }

  /**
   * VM의 전원을 켠다.
   * @tag VM
   * @summary VM 전원 켜기 API
   */
  @core.TypedRoute.Patch(":vmId/turn_on")
  async turnOnVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOnVM> {
    const res = await this.vmService.turnOnVM({
      vmId,
    });

    return res;
  }

  /**
   * VM의 전원을 끈다.
   * @tag VM
   * @summary VM 전원 끄기 API
   */
  @core.TypedRoute.Patch(":vmId/turn_off")
  async turnOffVM(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVM> {
    const res = await this.vmService.turnOffVM({
      vmId,
    });

    return res;
  }

  /**
   * VM을 강제종료한다. 동시에 삭제한다.
   * @tag VM
   * @summary VM 강제종료 API
   */
  @core.TypedRoute.Delete(":vmId/turn_off/force")
  async turnOffVMForced(
    @core.TypedParam("vmId") vmId: string & tags.Format<"uuid">,
    @User() user: UserDecoratorType,
  ): Promise<VMResponse.TurnOffVMForced> {
    const res = await this.vmService.turnOffVMForced({
      vmId,
    });

    return res;
  }

  /**
   * 키페어 생성
   * @tag VM
   * @summary 키페어 생성 API
   */
  @core.TypedRoute.Post("key_pair")
  async createKeypair(
    @core.TypedBody() body: VMRequest.Body.CreateKaypair,
  ): Promise<VMResponse.CreateKeypair> {
    const res = await this.vmService.createKeypair(body);

    return res;
  }

  /**
   * 키페어 목록 조회
   * @tag VM
   * @summary 키페어 목록 조회 API
   */
  @core.TypedRoute.Get("key_pair/list")
  async getKaypairList(): Promise<VMResponse.GetKeypairList> {
    const res = await this.vmService.getKeypairList();

    return res;
  }

  /**
   * 이미지 목록 조회. 이미지는 OS 이미지를 결정한다.
   * @tag VM
   * @summary 이미지 목록 조회 API
   */
  @core.TypedRoute.Get("image/list")
  async getImageList(): Promise<VMResponse.GetImageList> {
    const res = await this.vmService.getImageList();

    return res;
  }

  /**
   * Flavor 목록 조회. Flavor는 VM 인스턴스의 CPU, Memory 등 스펙을 결정한다.
   * @tag VM
   * @summary Flavor 목록 조회 API
   */
  @core.TypedRoute.Get("flavor/list")
  async getFlavorList(): Promise<VMResponse.GetFlavorList> {
    const res = await this.vmService.getFlavorList();

    return res;
  }
}

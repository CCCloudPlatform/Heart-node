import { SGRequest } from "@CCPlatform/dtos/security-group/sg-request.dto";
import { SGResponse } from "@CCPlatform/dtos/security-group/sg-response.dto";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { SGService } from "./security-group.service";

@Controller("security_group")
export class SGController {
  constructor(private readonly sgService: SGService) {}

  /**
   * 보안그룹 생성
   * @tag Security-Group
   * @summary 보안그룹 생성 API
   */
  @core.TypedRoute.Post()
  async createSG(
    @core.TypedBody() body: SGRequest.Body.CreateSG,
  ): Promise<SGResponse.CreateSG> {
    const res = await this.sgService.createSG(body);

    return res;
  }

  /**
   * 보안그룹 규칙 생성
   * @tag Security-Group
   * @summary 보안그룹 규칙 생성 API
   */
  @core.TypedRoute.Post("rule")
  async createSGRule(
    @core.TypedBody() body: SGRequest.Body.CreateSGRule,
  ): Promise<SGResponse.CreateSGRule> {
    const res = await this.sgService.createSGRule(body);
    return res;
  }

  /**
   * 보안그룹 목록 가져오기
   * @tag Security-Group
   * @summary 보안그룹 목록 가져오기 API
   */
  @core.TypedRoute.Get("list")
  async getSGList(): Promise<SGResponse.GetSGList> {
    const res = await this.sgService.getSGList();

    return res;
  }

  /**
   * 보안그룹 상세 보기
   * @tag Security-Group
   * @summary 보안그룹 상세 보기 API
   */
  @core.TypedRoute.Get(":sgId")
  async getSG(
    @core.TypedParam("sgId") sgId: string,
  ): Promise<SGResponse.GetSG> {
    const res = await this.sgService.getSG({
      sgId,
    });

    return res;
  }
}

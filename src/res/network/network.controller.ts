import { NetworkRequest } from "@CCPlatform/dtos/network/network-request.dto";
import { NetworkResponse } from "@CCPlatform/dtos/network/network-response.dto";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { AxiosError } from "axios";

import { NetworkService } from "./network.service";

@Controller("network")
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  /**
   * Network를 생성한다.
   * @tag Network
   * @summary Network 생성 API
   */
  @core.TypedRoute.Post()
  async createNetwork(
    @core.TypedBody() body: NetworkRequest.Body.CreateNetwork,
  ): Promise<NetworkResponse.CreateNetwork> {
    const res = await this.networkService.createNetwork(body);

    return res;
  }

  /**
   * Subnet를 생성한다. Network를 먼저 생성해야 한다.
   * @tag Network
   * @summary Subnet 생성 API
   */
  @core.TypedRoute.Post("subnet")
  async createSubnet(
    @core.TypedBody() body: NetworkRequest.Body.CreateSubnet,
  ): Promise<NetworkResponse.CreateSubnet> {
    const res = await this.networkService.createSubnet(body);

    return res;
  }

  /**
   * Network 목록 조회
   * @tag Network
   * @summary Network 목록 조회 API
   */
  @core.TypedRoute.Get("list")
  async getNetworkList(): Promise<NetworkResponse.GetNetworkList> {
    const res = await this.networkService.getNetworkList();

    return res;
  }
}

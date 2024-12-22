import { NetworkRequest } from "@CCPlatform/dtos/network/network-request.dto";
import { NetworkResponse } from "@CCPlatform/dtos/network/network-response.dto";
import { OpenstackService } from "@CCPlatform/external/openstack/openstack.service";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class NetworkService {
  constructor(private readonly openstackService: OpenstackService) {}

  async createNetwork(
    input: NetworkRequest.Body.CreateNetwork,
  ): Promise<NetworkResponse.CreateNetwork> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const network = await this.openstackService.createNetwork({
      token: token.token,
      networkName: input.networkName,
      neutronUrl: token.neutronUrl,
    });

    return { id: network.id, name: network.name };
  }

  async createSubnet(
    input: NetworkRequest.Body.CreateSubnet,
  ): Promise<NetworkResponse.CreateSubnet> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const subnet = await this.openstackService.createSubnet({
      token: token.token,
      neutronUrl: token.neutronUrl,
      networkId: input.networkId,
      cidr: input.cidr,
      enableDhcp: input.enableDhcp,
      ipVersion: input.ipVersion,
      subnetName: input.subnetName,
    });

    return subnet;
  }

  async getNetworkList(): Promise<NetworkResponse.GetNetworkList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const networkList = await this.openstackService.getNetworkList({
      token: token.token,
      neutronUrl: token.neutronUrl,
    });

    return {
      networkList,
    };
  }
}

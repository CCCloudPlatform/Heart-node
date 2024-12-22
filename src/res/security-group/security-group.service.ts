import { NetworkRequest } from "@CCPlatform/dtos/network/network-request.dto";
import { NetworkResponse } from "@CCPlatform/dtos/network/network-response.dto";
import { SGRequest } from "@CCPlatform/dtos/security-group/sg-request.dto";
import { SGResponse } from "@CCPlatform/dtos/security-group/sg-response.dto";
import { OpenstackService } from "@CCPlatform/external/openstack/openstack.service";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class SGService {
  constructor(private readonly openstackService: OpenstackService) {}

  async createSG(input: SGRequest.Body.CreateSG): Promise<SGResponse.CreateSG> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const sg = await this.openstackService.createSecurityGroup({
      token: token.token,
      neutronUrl: token.neutronUrl,
      description: input.description,
      sgName: input.sgName,
    });

    return sg;
  }

  async createSGRule(
    input: SGRequest.Body.CreateSGRule,
  ): Promise<NetworkResponse.CreateSGRule> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const sgRule = await this.openstackService.createSecurityGroupRule({
      token: token.token,
      neutronUrl: token.neutronUrl,
      allowIP: input.allowIP,
      direction: input.direction,
      etherType: input.etherType,
      maxPort: input.maxPort,
      minPort: input.minPort,
      protocol: input.protocol,
      securityGroupId: input.securityGroupId,
      description: input.description,
    });

    return {
      id: sgRule.id,
    };
  }

  async getSG(input: { sgId: string }): Promise<SGResponse.GetSG> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const sg = await this.openstackService.getSecurityGroupInfo({
      token: token.token,
      neutronUrl: token.neutronUrl,
      sgId: input.sgId,
    });

    return sg;
  }

  async getSGList(): Promise<SGResponse.GetSGList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.neutronUrl) {
      throw new BadRequestException("Can't get NeutronURL");
    }

    const sgList = await this.openstackService.getSecurityGroupList({
      token: token.token,
      neutronUrl: token.neutronUrl,
    });

    return sgList;
  }
}

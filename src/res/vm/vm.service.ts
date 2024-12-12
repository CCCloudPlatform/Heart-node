import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import { OpenstackService } from "@CCPlatform/external/openstack/openstack.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VMService {
  constructor(private readonly openstackService: OpenstackService) {}

  async createVM(input: VMRequest.Body.CreateVM): Promise<void> {
    const token = await this.openstackService.getAuthorizedToken();

    const a = await this.openstackService.createVM(
      input,
      token.novaUrl!,
      token.token,
    );

    return;
  }
}

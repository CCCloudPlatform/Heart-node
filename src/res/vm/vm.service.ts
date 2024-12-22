import { VMRequest } from "@CCPlatform/dtos/vm/vm-request.dto";
import { VMResponse } from "@CCPlatform/dtos/vm/vm-response.dto";
import { OpenstackService } from "@CCPlatform/external/openstack/openstack.service";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class VMService {
  constructor(private readonly openstackService: OpenstackService) {}

  async createVM(input: VMRequest.Body.CreateVM): Promise<VMResponse.CreateVM> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const vm = await this.openstackService.createVM({
      body: input,
      novaUrl: token.novaUrl,
      token: token.token,
    });

    return vm;
  }

  async createVMSnapshot(
    input: VMRequest.Body.CreateVMSnapshot & { vmId: string },
  ): Promise<VMResponse.CreateVMSnapshot> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const isCreated = await this.openstackService.createVMSnapshot({
      token: token.token,
      novaUrl: token.novaUrl,
      snapshotName: input.snapshotName,
      vmId: input.vmId,
    });

    return isCreated;
  }

  async getVMList(): Promise<VMResponse.GetVMList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const vm = await this.openstackService.getVMList({
      token: token.token,
      novaUrl: token.novaUrl,
    });

    return vm;
  }

  async restartVM(
    input: VMRequest.Body.RestartVM & { vmId: string },
  ): Promise<VMResponse.RestartVM> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const isRestarted = await this.openstackService.restartVM({
      token: token.token,
      novaUrl: token.novaUrl,
      vmId: input.vmId,
      type: input.type,
    });

    return isRestarted;
  }

  async turnOnVM(input: { vmId: string }): Promise<VMResponse.TurnOnVM> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const isTurnedOn = await this.openstackService.turnOnVM({
      token: token.token,
      novaUrl: token.novaUrl,
      vmId: input.vmId,
    });

    return isTurnedOn;
  }

  async turnOffVM(input: { vmId: string }): Promise<VMResponse.TurnOffVM> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const isTurnedOff = await this.openstackService.turnOffVM({
      token: token.token,
      novaUrl: token.novaUrl,
      vmId: input.vmId,
    });

    return isTurnedOff;
  }

  async turnOffVMForced(input: {
    vmId: string;
  }): Promise<VMResponse.TurnOffVMForced> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const isTurnedOff = await this.openstackService.turnOffVMForced({
      token: token.token,
      novaUrl: token.novaUrl,
      vmId: input.vmId,
    });

    return isTurnedOff;
  }

  async createKeypair(
    input: VMRequest.Body.CreateKaypair,
  ): Promise<VMResponse.CreateKeypair> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const keypair = await this.openstackService.createKeypair({
      token: token.token,
      novaUrl: token.novaUrl,
      keypairName: input.keypairName,
    });

    return keypair;
  }

  async getKeypairList(): Promise<VMResponse.GetKeypairList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const keypair = await this.openstackService.getKeypairList({
      token: token.token,
      novaUrl: token.novaUrl,
    });

    return {
      keypairList: keypair,
    };
  }

  async getImageList(): Promise<VMResponse.GetImageList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.glanceUrl) {
      throw new BadRequestException("Can't get GlanceURL");
    }

    const imageList = await this.openstackService.getImageList({
      token: token.token,
      glanceUrl: token.glanceUrl,
    });

    return {
      imageList: imageList,
    };
  }

  async getFlavorList(): Promise<VMResponse.GetFlavorList> {
    const token = await this.openstackService.getAuthorizedToken();

    if (!token.novaUrl) {
      throw new BadRequestException("Can't get NovaURL");
    }

    const flavorList = await this.openstackService.getFlavorList({
      token: token.token,
      novaUrl: token.novaUrl,
    });

    return {
      flavorList: flavorList,
    };
  }
}

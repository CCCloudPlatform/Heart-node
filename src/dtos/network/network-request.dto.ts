import { NetworkEntity } from "../models/network.entity";

export namespace NetworkRequest {
  export namespace Body {
    export interface CreateNetwork {
      networkName: string;
    }

    export interface CreateSubnet {
      subnetName: string;
      networkId: Pick<NetworkEntity, "id">["id"];
      ipVersion: 4 | 6;
      cidr: string;
      enableDhcp: boolean;
    }
  }
}

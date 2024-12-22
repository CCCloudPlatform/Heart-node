import { NetworkEntity } from "../models/network.entity";
import { SubnetEntity } from "../models/subnet.entity";

export namespace NetworkResponse {
  export type CreateNetwork = Pick<NetworkEntity, "id" | "name">;

  export type CreateSubnet = Pick<SubnetEntity, "id">;

  export type GetNetworkList = { networkList: NetworkEntity[] };

  export type CreateSGRule = Pick<NetworkEntity, "id">;
}

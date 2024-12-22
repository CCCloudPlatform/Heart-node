import {
  KeypairEntity,
  VMEntity,
  VMFlavorEntity,
  VMImageEntity,
} from "../models/vm.entity";

export namespace VMResponse {
  export type CreateVM = Pick<VMEntity, "id">;

  export type CreateVMSnapshot = true;

  export type GetVMList = VMEntity[];

  export type TurnOffVMForced = true;

  export type RestartVM = true;

  export type TurnOnVM = true;

  export type TurnOffVM = true;

  export type CreateKeypair = KeypairEntity;

  export type GetKeypairList = { keypairList: { keypair: KeypairEntity }[] };

  export type GetImageList = { imageList: VMImageEntity[] };

  export type GetFlavorList = { flavorList: VMFlavorEntity[] };
}

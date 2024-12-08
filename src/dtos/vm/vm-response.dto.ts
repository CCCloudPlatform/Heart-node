import { VMEntity } from "../models/vm.entity";

export namespace VMResponse {
  export type CreateVM = Pick<VMEntity, "host" | "id">;

  export type TurnOffVMForced = Pick<VMEntity, "id" | "host">;

  export type RestartVM = Pick<VMEntity, "id" | "host">;

  export type TurnOnVM = Pick<VMEntity, "id" | "host">;

  export type TurnOffVM = Pick<VMEntity, "id" | "host">;
}

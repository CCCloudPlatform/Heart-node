import { SGEntity, SGRuleEntity } from "../models/security-group";

export namespace SGResponse {
  export type CreateSG = Pick<SGEntity, "id">;

  export type CreateSGRule = Pick<SGRuleEntity, "id">;

  export type GetSG = SGEntity;

  export type GetSGList = SGEntity[];
}

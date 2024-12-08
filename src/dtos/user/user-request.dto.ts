import { UserEntity } from "../models/user.entity";

export namespace UserRequest {
  export namespace Body {
    export type RegisterUser = Pick<
      UserEntity,
      "username" | "password" | "nickname"
    >;

    export type LogIn = Pick<UserEntity, "username" | "password">;
  }

  export namespace Query {}
}

import { UserEntity } from "../models/user.entity";

export namespace UserResponse {
  export type RegisterUser = Pick<
    UserEntity,
    "id" | "createdAt" | "nickname" | "username"
  >;

  export type LogIn = {
    accessToken: string;
  };
}

import { UserRequest } from "@CCPlatform/dtos/user/user-request.dto";
import { UserResponse } from "@CCPlatform/dtos/user/user-response.dto";
import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * username(이메일)과 password(비밀번호)을 이용해서
   * @tag User
   * @summary 회원가입 API
   */
  @core.TypedRoute.Post("register")
  async registerUser(
    @core.TypedBody() body: UserRequest.Body.RegisterUser,
  ): Promise<UserResponse.RegisterUser> {
    return {
      id: uuidv4(),
      nickname: body.nickname,
      username: body.username,
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * 사용자 로그인
   * @tag User
   * @summary 로그인 API
   */
  @core.TypedRoute.Post("login")
  async logIn(
    @core.TypedBody() body: UserRequest.Body.LogIn,
  ): Promise<UserResponse.LogIn> {
    return {
      accessToken: "hi",
    };
  }
}

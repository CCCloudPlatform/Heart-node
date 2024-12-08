import { CCGlobal } from "@CCPlatform/cc-global";
import { JwtPayload } from "@CCPlatform/utils/types/auth/jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

@Injectable()
export class UserInfoTokenStrategy extends PassportStrategy(
  Strategy,
  "user-info-token",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CCGlobal.env.USER_INFO_JWT_SECRET,
    } satisfies StrategyOptions);
  }

  async validate(payload: JwtPayload) {
    const { iat, exp, ...user } = payload;

    return user;
  }
}

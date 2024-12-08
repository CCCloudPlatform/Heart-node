import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class UserInfoTokenGuard extends AuthGuard("user-info-token") {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);

    if (!can) {
      return false;
    }

    return true;
  }
}

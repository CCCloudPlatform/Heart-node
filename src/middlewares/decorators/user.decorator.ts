import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export type UserDecoratorType = {
  id: string;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (data === undefined) return request.user;

    return request.user;
  },
);

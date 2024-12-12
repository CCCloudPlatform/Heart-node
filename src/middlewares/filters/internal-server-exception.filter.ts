import { CCGlobal } from "@CCPlatform/cc-global";
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const logStr = `[InternalServerErrorException] IP: ${request.ip} | Method: ${request.method} | Path: ${request.url} | Name: ${exception instanceof Error ? exception.name : "Unknown"} | Message: ${exception instanceof Error ? exception.message : String(exception)} | Stack: ${exception instanceof Error ? exception.stack : "No stack trace"}`;

    Logger.fatal(logStr);

    response.status(500).json(
      CCGlobal.env.NODE_ENV === "test"
        ? logStr
        : {
            code: 500,
            result: "Internal Server Error",
          },
    );
  }
}

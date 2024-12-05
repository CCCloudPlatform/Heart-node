import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const logStr = `[HttpExceptionFilter] IP: ${request.ip} | Method: ${request.method} | Path: ${request.url} | Name: ${exception instanceof Error ? exception.name : "Unknown"} | Message: ${exception instanceof Error ? exception.message : String(exception)} | Stack: ${exception instanceof Error ? exception.stack : "No stack trace"}`;

    Logger.error(logStr);

    response.status(status).json({
      success: false,
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception?.message || "",
      data: exception?.getResponse() || {},
    });
  }
}

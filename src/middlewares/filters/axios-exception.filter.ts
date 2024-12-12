import { CCGlobal } from "@CCPlatform/cc-global";
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { Request, Response } from "express";

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const data = exception.response?.data;
    const code = exception.response?.status ?? 500;
    const message = exception.response?.statusText;

    const log = `[AxiosException] Method: ${request.method}, URL: ${request.url}, Code: ${code}, Message: ${message}, IP: ${request.ip}`;
    if (code >= 500) {
      Logger.error(log);
      Logger.error(data, "AxiosException");
    } else {
      Logger.warn(log);
      Logger.error(data, "AxiosException");
    }

    response.status(code).json(
      CCGlobal.env.NODE_ENV === "test"
        ? data
        : {
            code,
            result: "Axios Error",
          },
    );
  }
}

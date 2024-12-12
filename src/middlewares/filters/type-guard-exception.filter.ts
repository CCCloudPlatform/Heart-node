import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TypeGuardError } from 'typia';
import { Request, Response } from 'express';

@Catch(TypeGuardError)
export class TypeGuardExceptionFilter implements ExceptionFilter {
  catch(exception: TypeGuardError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const code = 400;

    const message = exception.message;
    const expected = exception.expected;
    const value = exception.value;

    const log = `[TypeGuardException] Method: ${request.method}, URL: ${request.url}, Code: ${code}, Message: ${message}, Expected: ${expected}, Input: ${value}, IP: ${request.ip}`;

    Logger.warn(log);

    response.status(code).json({
      code,
      result: 'Validation Error',
    });
  }
}

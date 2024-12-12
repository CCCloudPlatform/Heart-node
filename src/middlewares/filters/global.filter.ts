import { ExceptionFilter } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { AxiosExceptionFilter } from "./axios-exception.filter";
import { HttpExceptionFilter } from "./http-exception.filter";
import { InternalServerExceptionFilter } from "./internal-server-exception.filter";
import { TypeGuardExceptionFilter } from "./type-guard-exception.filter";

export const GLOBAL_FILTERS: {
  provide: typeof APP_FILTER;
  useClass: new (...args: any[]) => ExceptionFilter;
}[] = [
  {
    provide: APP_FILTER,
    useClass: InternalServerExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: AxiosExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: TypeGuardExceptionFilter,
  },
];

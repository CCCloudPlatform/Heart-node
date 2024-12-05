import { ExceptionFilter } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { HttpExceptionFilter } from "./http-exception.filter";

export const GLOBAL_FILTERS: {
  provide: typeof APP_FILTER;
  useClass: new (...args: any[]) => ExceptionFilter;
}[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];

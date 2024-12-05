import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { CCGlobal } from "src/cc-global";

@Module({})
export class TracingModule implements OnModuleInit, OnModuleDestroy {
  private readonly sdk: NodeSDK;

  constructor() {
    const sdk = new NodeSDK({
      traceExporter: new ZipkinExporter({
        url: CCGlobal.env.ZIPKIN_URL,
        serviceName: CCGlobal.env.ZIPKIN_SERVICE,
      }),
      instrumentations: [],
    });
  }
  async onModuleDestroy() {
    throw new Error("Method not implemented.");
  }

  async onModuleInit() {
    throw new Error("Method not implemented.");
  }
}

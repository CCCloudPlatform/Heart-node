import { CCBackend } from "./cc-backend";

async function main(): Promise<void> {
  const backend: CCBackend = new CCBackend();
  await backend.open();

  process.send?.("ready");
  process.on("SIGTERM", async () => {
    await backend.close();
    process.exit(0);
  });
  global.process.on("uncaughtException", console.error);
  global.process.on("unhandledRejection", console.error);
}
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});

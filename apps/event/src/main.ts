import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "./common/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = app.get(ConfigService).get<AppConfig>("app");
  await app.listen(port);
}
bootstrap();

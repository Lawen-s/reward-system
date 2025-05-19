import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppConfig } from "./common/config";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = app.get(ConfigService).get<AppConfig>("app");
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();

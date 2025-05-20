import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AppConfig } from "./common/config";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = app.get(ConfigService).get<AppConfig>("app");
  app.useGlobalPipes(new ValidationPipe());

  const documentConfig = new DocumentBuilder()
    .setTitle("Pluva Market V2")
    .setDescription("API description")
    .setVersion("0.9")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        name: "JWT",
        in: "header",
      },
      "access-token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
}
bootstrap();

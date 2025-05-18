import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { config } from "./common/config";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, "..", "..", ".env.base"), // 공통 설정 (먼저 읽힘)
        join(__dirname, "..", ".env"), // 서비스 설정 (덮어씀)
      ],
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_ISSUER: Joi.string().required(),
        JWT_AUDIENCE: Joi.string().required(),
        JWS_KEY_BASE64: Joi.string().required(),
        JWS_ALGORITHM: Joi.string().required(),
        JWS_EXPIRATION: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

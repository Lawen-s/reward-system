import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./common/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { join } from "path";

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
        MONGO_URI: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_AUTH_SOURCE: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGO_URI"),
        dbName: configService.get("MONGO_DB"),
        authSource: configService.get("MONGO_AUTH_SOURCE"),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

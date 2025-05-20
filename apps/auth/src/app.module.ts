import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "./common/config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { join } from "path";
import { TokenModule } from "./token/token.module";
import { UserEventProgressModule } from "./user-event-progress/user-event-progress.module";
import { HTTPLoggingMiddleware } from "./common/http-logging.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        // join(__dirname, "..", ".env.base"),
        join(__dirname, "..", ".env.local"),
      ],
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_URI: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_AUTH_SOURCE: Joi.string().required(),
        JWT_ISSUER: Joi.string().required(),
        JWT_AUDIENCE: Joi.string().required(),
        JWS_KEY_BASE64: Joi.string().required(),
        JWS_ALGORITHM: Joi.string().required(),
        JWS_EXPIRATION: Joi.string().required(),
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
    TokenModule,
    UserEventProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggingMiddleware).forRoutes("*");
  }
}

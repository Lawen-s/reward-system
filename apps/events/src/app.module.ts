import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import { join } from "path";
import { config } from "./common/config";
import { EventsModule } from "./events/events.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, "..", "..", "..", ".env.base"),
        join(__dirname, "..", ".env"),
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
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

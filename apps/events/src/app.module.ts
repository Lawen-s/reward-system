import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { join } from "path";
import { config } from "./common/config";
import { EventsModule } from "./events/events.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, "..", "..", ".env.base"),
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
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
      authSource: process.env.MONGO_AUTH_SOURCE,
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { config } from "./common/config";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AuthModule } from "./auth/auth.module";
import { EventModule } from "./events/events.module";
import { RewardsModule } from "./rewards/rewards.module";
import { EventRewardModule } from "./event-reward/event-reward.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, "..", "..", "..", "..", ".env.base"),
        join(__dirname, "..", "..", ".env"),
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
    EventModule,
    RewardsModule,
    EventRewardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

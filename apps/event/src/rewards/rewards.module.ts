import { MongooseModule } from "@nestjs/mongoose";
import { Rewards, RewardsSchema } from "./schema/rewards.schema";
import { Module } from "@nestjs/common";
import { RewardsController } from "./rewards.controller";
import { RewardsService } from "./rewards.service";
import { RewardHistoryModule } from "src/reward-history/reward-history.module";
import { EventRewardModule } from "src/event-reward/event-reward.module";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Rewards.name, schema: RewardsSchema }]),
    RewardHistoryModule,
    EventRewardModule,
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService],
})
export class RewardsModule {}

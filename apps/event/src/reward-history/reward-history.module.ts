import { Module } from "@nestjs/common";
import {
  RewardHistory,
  RewardHistorySchema,
} from "./schema/reward-history.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardHistoryService } from "./reward-history.service";
import { RewardHistoryController } from "./reward-history.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardHistory.name, schema: RewardHistorySchema },
    ]),
  ],
  controllers: [RewardHistoryController],
  providers: [RewardHistoryService],
  exports: [RewardHistoryService],
})
export class RewardHistoryModule {}

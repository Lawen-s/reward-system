import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventReward, EventRewardSchema } from "./schema/event-reward.schema";
import { EventRewardController } from "./event-reward.controller";
import { EventRewardService } from "./event-reward.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventReward.name, schema: EventRewardSchema },
    ]),
  ],
  controllers: [EventRewardController],
  providers: [EventRewardService],
  exports: [EventRewardService],
})
export class EventRewardModule {}

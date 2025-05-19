import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Events, EventsSchema } from "./schema/events.schema";
import { Rewards, RewardsSchema } from "./schema/rewards.schema";
import { EventsService } from "./events.service";
import { EventReward, EventRewardSchema } from "./schema/event-reward.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Events.name, schema: EventsSchema },
      // { name: Rewards.name, schema: RewardsSchema },
      // { name: EventReward.name, schema: EventRewardSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

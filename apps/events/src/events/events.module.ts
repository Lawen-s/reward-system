import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Events, EventsSchema } from "./schema/events.schema";
import { EventsService } from "./events.service";
import { EventRewardModule } from "../event-reward/event-reward.module";
import { RewardsModule } from "../rewards/rewards.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }]),
    EventRewardModule,
    RewardsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

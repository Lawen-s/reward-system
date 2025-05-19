import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./schema/events.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventsController],
  providers: [],
})
export class EventsModule {}

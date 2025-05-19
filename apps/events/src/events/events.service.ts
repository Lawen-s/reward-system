import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Events, EventsDocument } from "./schema/events.schema";
import { CreateEventDto } from "./dto/create-event.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name)
    private eventModel: Model<EventsDocument>
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const event = await this.eventModel.create(createEventDto);
    return event;
  }
}

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }

  @Get(":id")
  getEventById(@Param("id") id: string) {
    return this.eventsService.getEventById(id);
  }
}

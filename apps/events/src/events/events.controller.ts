import { Controller, Get, Param } from "@nestjs/common";

@Controller("events")
export class EventsController {
  @Get()
  getEventList() {
    return "Hello World";
  }

  @Get(":id")
  getEvent(@Param("id") id: string) {
    return "Hello World";
  }
}

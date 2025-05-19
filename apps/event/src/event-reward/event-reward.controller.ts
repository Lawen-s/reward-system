import { Body, Controller, Post } from "@nestjs/common";
import { EventRewardService } from "./event-reward.service";
import { CreateEventRewardDto } from "./dto/create-event-reward.dto";

@Controller("event-rewards")
export class EventRewardController {
  constructor(private readonly eventRewardService: EventRewardService) {}

  @Post()
  createEventReward(@Body() createEventRewardDto: CreateEventRewardDto) {
    return this.eventRewardService.createEventReward(createEventRewardDto);
  }
}

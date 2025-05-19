import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { UserEventProgressService } from "./user-event-progress.service";
import { CreateUserEventProgressDto } from "./dto/create-user-event-progress.dto";

@Controller("user-event-progress")
export class UserEventProgressController {
  constructor(
    private readonly userEventProgressService: UserEventProgressService
  ) {}

  @Post()
  createUserEventProgress(
    @Body() createUserEventProgressDto: CreateUserEventProgressDto
  ) {
    return this.userEventProgressService.createUserEventProgress(
      createUserEventProgressDto.userId,
      createUserEventProgressDto.eventId,
      createUserEventProgressDto.progress
    );
  }

  @Get(":userId/:eventId")
  getUserEventProgress(
    @Param("userId") userId: string,
    @Param("eventId") eventId: string
  ) {
    return this.userEventProgressService.getUserEventProgress(userId, eventId);
  }

  @Patch(":userId/:eventId")
  updateUserEventProgress(
    @Param("userId") userId: string,
    @Param("eventId") eventId: string,
    @Body("progress") progress: number
  ) {
    return this.userEventProgressService.updateUserEventProgress(
      userId,
      eventId,
      progress
    );
  }

  @Patch(":userId/:eventId/claim-reward")
  claimUserEventReward(
    @Param("userId") userId: string,
    @Param("eventId") eventId: string
  ) {
    return this.userEventProgressService.claimUserEventReward(userId, eventId);
  }
}

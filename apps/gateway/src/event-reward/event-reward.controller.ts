import { Controller, Body, Post } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateEventRewardDto } from "./dto/create-event-reward.dto";

@Controller("event-rewards")
@ApiTags("event-rewards")
export class EventRewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  @ApiOperation({ summary: "이벤트 보상 생성" })
  @ApiBody({
    description: "이벤트 보상 생성 데이터",
    type: CreateEventRewardDto,
  })
  async createEventReward(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://event:3002/event-rewards", body)
    );
    return response.data;
  }
}

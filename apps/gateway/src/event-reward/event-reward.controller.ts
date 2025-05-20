import { Controller, Body, Post, UseGuards, SetMetadata } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateEventRewardDto } from "./dto/create-event-reward.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";

@Controller("event-rewards")
@ApiTags("event-rewards")
@UseGuards(AuthGuard("user"), RolesGuard)
@SetMetadata("roles", ["ADMIN", "OPERATOR"])
export class EventRewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  @ApiOperation({ summary: "이벤트와 보상을 연결합니다." })
  @ApiBody({
    description: "이벤트-보상 생성 데이터",
    type: CreateEventRewardDto,
  })
  async createEventReward(@Body() body: CreateEventRewardDto) {
    const response = await firstValueFrom(
      this.httpService.post("http://event:3002/event-rewards", body)
    );
    return response.data;
  }
}

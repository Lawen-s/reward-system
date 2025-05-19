import { Controller, Body, Post } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Controller("event-rewards")
export class EventRewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async createEventReward(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/event-rewards", body)
    );
    return response.data;
  }
}

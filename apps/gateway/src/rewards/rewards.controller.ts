import { HttpService } from "@nestjs/axios";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  SetMetadata,
  Req,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";
import { firstValueFrom } from "rxjs";
import { RequestWithUser } from "common/interface/request-user.interface";

@UseGuards(AuthGuard("user"), RolesGuard)
@Controller("rewards")
export class RewardsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  async getRewards() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/rewards")
    );
    return response.data;
  }

  @Get(":id")
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  async getRewardById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/rewards/${id}`)
    );
    return response.data;
  }

  @Post()
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  async createReward(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/rewards", body)
    );
    return response.data;
  }

  @Get("request/me")
  @SetMetadata("roles", ["USER"])
  async getRewardHistoryInSuccessByEventRewardId(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/rewards/request/me`, {
        headers: { "x-user-id": userId },
      })
    );
    return response.data;
  }

  @Post("request")
  @SetMetadata("roles", ["USER"])
  async requestReward(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/rewards/request", body)
    );
    return response.data;
  }
}

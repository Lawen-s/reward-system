import { HttpService } from "@nestjs/axios";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  SetMetadata,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";
import { firstValueFrom } from "rxjs";

@UseGuards(AuthGuard("user"), RolesGuard)
@SetMetadata("roles", ["ADMIN", "OPERATOR"])
@Controller("rewards")
export class RewardsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getRewards() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/rewards")
    );
    return response.data;
  }

  @Get(":id")
  async getRewardById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/rewards/${id}`)
    );
    return response.data;
  }

  @Post()
  async createReward(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/rewards", body)
    );
    return response.data;
  }
}

import { HttpService } from "@nestjs/axios";
import { Controller, Get, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";
import { firstValueFrom } from "rxjs";
import { RequestWithUser } from "src/interface/request-user.interface";

@UseGuards(AuthGuard("user"), RolesGuard)
@Controller("reward-history")
export class RewardHistoryController {
  constructor(private readonly httpService: HttpService) {}

  @Get("request/all")
  @SetMetadata("roles", ["ADMIN", "OPERATOR", "AUDITOR", "USER"])
  async getRewardHistory() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/reward-history/request/all")
    );
    return response.data;
  }

  @Get("request/me")
  @SetMetadata("roles", ["USER"])
  async getRewardHistoryInSuccessByEventRewardId(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/reward-history/request/me`, {
        headers: { "x-user-id": userId },
      })
    );
    return response.data;
  }
}

import { HttpService } from "@nestjs/axios";
import { Controller, Get, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";
import { firstValueFrom } from "rxjs";
import { RequestWithUser } from "src/common/interface/request-user.interface";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard("user"), RolesGuard)
@ApiTags("reward-history")
@Controller("reward-history")
export class RewardHistoryController {
  constructor(private readonly httpService: HttpService) {}

  @Get("request/all")
  @ApiOperation({ summary: "보상 내역 전체 조회(관리자영역)" })
  @SetMetadata("roles", ["ADMIN", "OPERATOR", "AUDITOR", "USER"])
  async getRewardHistory() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/reward-history/request/all")
    );
    return response.data;
  }

  @Get("request/me")
  @ApiOperation({ summary: "보상 내역 조회(유저)" })
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

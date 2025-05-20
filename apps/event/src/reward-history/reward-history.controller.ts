import { Controller, Get, Req } from "@nestjs/common";
import { RewardHistoryService } from "./reward-history.service";

interface RequestWithUserId extends Request {
  headers: Request["headers"] & {
    "x-user-id"?: string;
  };
}

@Controller("reward-history")
export class RewardHistoryController {
  constructor(private readonly rewardHistoryService: RewardHistoryService) {}

  @Get("request/all")
  getRewardHistory() {
    return this.rewardHistoryService.getRewardHistory();
  }

  @Get("request/me")
  getRewardHistoryByUserId(@Req() req: RequestWithUserId) {
    const userId = req.headers["x-user-id"];
    return this.rewardHistoryService.getRewardHistoryByUserId(userId);
  }
}

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RewardsService } from "./rewards.service";
import { CreateRewardDto } from "./dto/create-reward.dto";
import { RequestRewardDto } from "./dto/request-reward.dto";

@Controller("rewards")
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Post()
  createReward(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardsService.createReward(createRewardDto);
  }

  @Get()
  getRewards() {
    return this.rewardsService.getRewards();
  }

  @Get(":id")
  getRewardById(@Param("id") id: string) {
    return this.rewardsService.getRewardById(id);
  }

  @Post("request")
  requestReward(@Body() requestRewardDto: RequestRewardDto) {
    return this.rewardsService.requestReward(requestRewardDto);
  }
}

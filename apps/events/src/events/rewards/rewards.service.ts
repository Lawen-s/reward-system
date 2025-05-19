import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rewards, RewardsDocument } from "./schema/rewards.schema";
import { CreateRewardDto } from "./dto/create-reward.dto";

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Rewards.name)
    private rewardModel: Model<RewardsDocument>
  ) {}

  async createReward(createRewardDto: CreateRewardDto) {
    const reward = await this.rewardModel.create(createRewardDto);
    return reward;
  }

  async getRewards() {
    const rewards = await this.rewardModel.find();
    return rewards;
  }

  async getRewardById(id: string) {
    const reward = await this.rewardModel.findById(id);
    return reward;
  }
}

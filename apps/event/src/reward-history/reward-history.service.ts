import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  RewardHistory,
  RewardHistoryDocument,
} from "./schema/reward-history.schema";
import { CreateRewardHistoryDto } from "./dto/create-reward-history.dto";

@Injectable()
export class RewardHistoryService {
  constructor(
    @InjectModel(RewardHistory.name)
    private rewardHistoryModel: Model<RewardHistoryDocument>
  ) {}

  async create(createRewardHistoryDto: CreateRewardHistoryDto) {
    const rewardHistory = await this.rewardHistoryModel.create(
      createRewardHistoryDto
    );
    return rewardHistory;
  }

  async getRewardHistory() {
    const rewardHistory = await this.rewardHistoryModel.find();
    return rewardHistory;
  }

  async getRewardHistoryInSuccessByEventRewardId(eventRewardId: string) {
    const rewardHistory = await this.rewardHistoryModel.find({
      eventRewardId,
      success: true,
    });
    return rewardHistory;
  }

  async getRewardHistoryByUserId(userId: string) {
    const rewardHistory = await this.rewardHistoryModel
      .find({
        userId,
      })
      .populate({
        path: "eventRewardId",
        populate: {
          path: "eventId",
          select: "title",
        },
      });
    return rewardHistory.map((history) => {
      const eventReward: any = history.eventRewardId;
      const event: any = eventReward?.eventId;
      return {
        success: history.success,
        requestedAt: history.requestedAt,
        reason: history.reason,
        eventContent: event.title ?? null,
      };
    });
  }
}

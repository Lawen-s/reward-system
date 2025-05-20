import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rewards, RewardsDocument } from "./schema/rewards.schema";
import { CreateRewardDto } from "./dto/create-reward.dto";
import { EventRewardService } from "../event-reward/event-reward.service";
import { RequestRewardDto } from "./dto/request-reward.dto";
import { RewardHistoryService } from "src/reward-history/reward-history.service";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  category: string;
  endAt: Date;
  startAt: Date;
  requiredNumber: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
@Injectable()
export class RewardsService {
  constructor(
    @InjectModel(Rewards.name)
    private rewardModel: Model<RewardsDocument>,
    private readonly eventRewardService: EventRewardService,
    private readonly rewardHistoryService: RewardHistoryService,
    private readonly httpService: HttpService
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

  async requestReward(requestRewardDto: RequestRewardDto) {
    const { userId, eventId, rewardId } = requestRewardDto;

    const eventReward =
      await this.eventRewardService.getEventRewardByEventIdAndRewardId(
        eventId,
        rewardId
      );
    const userEventProgress = await firstValueFrom(
      this.httpService.get(
        `http://localhost:3000/user-event-progress/${userId}/${eventId}`,
        {}
      )
    ).then((res) => res.data);

    if (!eventReward) {
      return;
    }

    if (eventReward.quantity <= 0) {
      await this.rewardHistoryService.create({
        userId,
        eventRewardId: eventReward._id.toString(),
        success: false,
        reason: "지급할 수 있는 보상 수량이 소진되었습니다.",
      });
      return { success: false, reason: "보상 수량이 조기 마감되었습니다." };
    }

    const event = eventReward.eventId as any;
    if (userEventProgress.progress < event.requiredNumber) {
      await this.rewardHistoryService.create({
        userId,
        eventRewardId: eventReward._id.toString(),
        success: false,
        reason: "보상 지급 조건을 충족하지 않습니다.",
      });
      return { success: false, reason: "보상 지급 조건을 충족하지 않습니다." };
    }

    const rewardHistory =
      await this.rewardHistoryService.getRewardHistoryInSuccessByEventRewardId(
        eventReward._id.toString()
      );
    if (rewardHistory.length > 0) {
      return { success: false, reason: "이미 보상을 지급받았습니다." };
    }

    await this.rewardHistoryService.create({
      userId,
      eventRewardId: eventReward._id.toString(),
      success: true,
      reason: "정상 지급",
    });

    await this.eventRewardService.updateEventReward(
      eventReward._id.toString(),
      {
        quantity: eventReward.quantity - 1,
      }
    );
    return { success: true, reason: "정상 지급" };
  }
}

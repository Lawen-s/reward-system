import { Injectable, NotFoundException } from "@nestjs/common";
import {
  UserEventProgress,
  UserEventProgressDocument,
} from "./schema/user-event-progress.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserEventProgressService {
  constructor(
    @InjectModel(UserEventProgress.name)
    private userEventProgressModel: Model<UserEventProgressDocument>
  ) {}

  async createUserEventProgress(
    userId: string,
    eventId: string,
    progress: number
  ) {
    const userEventProgress = new this.userEventProgressModel({
      userId,
      eventId,
      progress,
    });
    return userEventProgress.save();
  }

  async checkAndHandleLoginEvent(userId: string, lastLoginAt?: Date) {
    if (!lastLoginAt) return;

    const now = new Date();
    const last = new Date(lastLoginAt);

    const isYesterday =
      last.getFullYear() === now.getFullYear() &&
      last.getMonth() === now.getMonth() &&
      last.getDate() === now.getDate() - 1;

    if (isYesterday) {
      await this.handleLoginEvent(userId, lastLoginAt);
    }
  }

  async handleLoginEvent(userId: string, lastLoginAt: Date) {
    const loginEventId = "682b76939bc027c1184d1f2f";
    const userEventProgress = await this.getUserEventProgress(
      userId,
      loginEventId
    );

    if (!userEventProgress) {
      await this.createUserEventProgress(userId, loginEventId, 0);
    } else {
      await this.updateUserEventProgress(
        userId,
        loginEventId,
        userEventProgress.progress + 1
      );
    }
  }

  async getUserEventProgress(userId: string, eventId: string) {
    return this.userEventProgressModel.findOne({ userId, eventId });
  }

  async updateUserEventProgress(
    userId: string,
    eventId: string,
    progress: number
  ) {
    return this.userEventProgressModel.findOneAndUpdate(
      { userId, eventId },
      { progress },
      { new: true }
    );
  }

  async claimUserEventReward(userId: string, eventId: string) {
    return this.userEventProgressModel.findOneAndUpdate(
      { userId, eventId },
      { rewardClaimed: true },
      { new: true }
    );
  }
}

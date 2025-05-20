import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventReward, EventRewardDocument } from "./schema/event-reward.schema";
import { Model } from "mongoose";
import { CreateEventRewardDto } from "./dto/create-event-reward.dto";
import { UpdateEventRewardDto } from "./dto/update-event-reward.dto";

@Injectable()
export class EventRewardService {
  constructor(
    @InjectModel(EventReward.name)
    private eventRewardModel: Model<EventRewardDocument>
  ) {}

  async createEventReward(createEventRewardDto: CreateEventRewardDto) {
    const eventReward =
      await this.eventRewardModel.create(createEventRewardDto);
    return eventReward;
  }

  async getRewardsByEventId(eventId: string) {
    return this.eventRewardModel.find({ eventId });
  }

  async getEventRewardByEventIdAndRewardId(eventId: string, rewardId: string) {
    return this.eventRewardModel
      .findOne({ eventId, rewardId })
      .populate("eventId")
      .populate("rewardId");
  }

  async updateEventReward(
    eventRewardId: string,
    updateEventRewardDto: UpdateEventRewardDto
  ) {
    return this.eventRewardModel.findByIdAndUpdate(
      eventRewardId,
      updateEventRewardDto,
      {
        new: true,
      }
    );
  }
}

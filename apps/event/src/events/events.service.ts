import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Events, EventsDocument } from "./schema/events.schema";
import { CreateEventDto } from "./dto/create-event.dto";
import { InjectModel } from "@nestjs/mongoose";
import { EventRewardService } from "../event-reward/event-reward.service";
import { RewardsService } from "../rewards/rewards.service";

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name)
    private eventModel: Model<EventsDocument>,
    private readonly eventRewardService: EventRewardService,
    private readonly rewardsService: RewardsService
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    const event = await this.eventModel.create(createEventDto);
    return event;
  }

  async getEvents() {
    const events = await this.eventModel.find();
    return events;
  }

  async getEventById(id: string) {
    const event = await this.eventModel.findById(id);
    if (!event) return null;
    const eventRewards = await this.eventRewardService.getRewardsByEventId(id);
    const rewardIds = eventRewards.map((er) => er.rewardId);
    const rewards = await this.rewardsService["rewardModel"].find({
      _id: { $in: rewardIds },
    });
    return {
      ...event.toJSON(),
      leftQuantity: eventRewards.reduce((acc, er) => acc + er.quantity, 0),
      rewards,
    };
  }
}

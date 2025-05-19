import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventRewardDocument = HydratedDocument<EventReward>;

@Schema({ timestamps: true, collection: "event_rewards" })
export class EventReward {
  @Prop({ type: Types.ObjectId, ref: "Event", required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Reward", required: true })
  rewardId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}

export const EventRewardSchema = SchemaFactory.createForClass(EventReward);

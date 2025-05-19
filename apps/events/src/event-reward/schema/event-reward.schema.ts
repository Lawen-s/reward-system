import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventRewardDocument = HydratedDocument<EventReward>;

@Schema({
  timestamps: true,
  collection: "event_rewards",
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class EventReward {
  @Prop({ type: Types.ObjectId, ref: "Event", required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Reward", required: true })
  rewardId: Types.ObjectId;

  @Prop({ required: true, comment: "보상 총 수량" })
  quantity: number;
}

export const EventRewardSchema = SchemaFactory.createForClass(EventReward);

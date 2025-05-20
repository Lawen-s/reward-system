import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserEventProgressDocument = HydratedDocument<UserEventProgress>;

@Schema({
  timestamps: true,
  collection: "user_event_progress",
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    },
  },
})
export class UserEventProgress {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ default: 0 })
  progress: number;

  @Prop({ default: false })
  rewardClaimed: boolean;
}

export const UserEventProgressSchema =
  SchemaFactory.createForClass(UserEventProgress);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RewardHistoryDocument = HydratedDocument<RewardHistory>;

@Schema({ timestamps: true, collection: "reward_history" })
export class RewardHistory {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: "EventReward", required: true })
  eventRewardId: Types.ObjectId;

  @Prop({ required: true })
  success: boolean;

  @Prop()
  reason: string;

  @Prop({ default: Date.now })
  requestedAt: Date;
}

export const RewardHistorySchema = SchemaFactory.createForClass(RewardHistory);

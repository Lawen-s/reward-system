import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RewardType } from "src/common/reward-type.enum";

export type RewardsDocument = HydratedDocument<Rewards>;

@Schema({
  timestamps: true,
  collection: "rewards",
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Rewards {
  @Prop({ required: true, comment: "보상 이름" })
  title: string;

  @Prop({ required: true, comment: "보상 설명" })
  description: string;

  @Prop({ default: null, comment: "종료일" })
  endAt: Date;

  @Prop({ default: null, comment: "시작일" })
  startAt: Date;

  @Prop({ required: true, enum: RewardType, comment: "보상 타입" })
  type: string;
}

export const RewardsSchema = SchemaFactory.createForClass(Rewards);

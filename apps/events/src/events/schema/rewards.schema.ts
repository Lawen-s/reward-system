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
      return ret;
    },
  },
})
export class Rewards {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, select: false, default: false })
  isActive: boolean;

  @Prop({ default: null })
  endAt: Date;

  @Prop({ default: null })
  startAt: Date;

  @Prop({ required: true, enum: RewardType })
  type: string;

  @Prop({ type: Object, default: {} })
  meta: Record<string, any>;
}

export const RewardsSchema = SchemaFactory.createForClass(Rewards);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventsDocument = HydratedDocument<Events>;

@Schema({
  timestamps: true,
  collection: "events",
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Events {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    select: false,
    default: false,
    comment: "활성화 여부",
  })
  isActive: boolean;

  @Prop({ default: "PUBLIC", comment: "이벤트 종류" })
  category: string;

  @Prop({ default: null, comment: "이벤트 종료일" })
  endAt: Date;

  @Prop({ default: null, comment: "이벤트 시작일" })
  startAt: Date;

  @Prop({ required: true, default: 0, comment: "달성 조건" })
  requiredNumber: number;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

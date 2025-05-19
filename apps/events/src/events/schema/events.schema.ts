import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    },
  },
})
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, select: false, default: false })
  isActive: boolean;

  @Prop({ default: "PUBLIC" })
  category: string;

  @Prop({ default: null })
  endAt: Date;

  @Prop({ default: null })
  startAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);

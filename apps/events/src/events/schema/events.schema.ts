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

  @Prop({ required: true, select: false, default: false })
  isActive: boolean;

  @Prop({ default: "PUBLIC" })
  category: string;

  @Prop({ default: null })
  endAt: Date;

  @Prop({ default: null })
  startAt: Date;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

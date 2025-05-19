import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
  collection: "users",
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
})
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: "USER" })
  role: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

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
      delete ret.isDeleted;
      delete ret.deletedAt;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Users {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, select: false, type: String })
  password: string;

  @Prop({ default: "USER", type: String })
  role: string;

  @Prop({ type: Date, default: null })
  lastLoginAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

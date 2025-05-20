import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./schema/users.schema";
import { TokenModule } from "../token/token.module";
import { UserEventProgressModule } from "src/user-event-progress/user-event-progress.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    TokenModule,
    UserEventProgressModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

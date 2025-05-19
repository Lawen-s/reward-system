import { Module } from "@nestjs/common";
import { EventRewardController } from "./event-reward.controller";
import { HttpModule } from "@nestjs/axios";
import { JwtStrategy } from "src/common/jwt.strategy";

@Module({
  imports: [HttpModule],
  controllers: [EventRewardController],
  providers: [JwtStrategy],
})
export class EventRewardModule {}

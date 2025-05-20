import { Module } from "@nestjs/common";
import { JwtStrategy } from "src/common/jwt.strategy";
import { HttpModule } from "@nestjs/axios";
import { RewardHistoryController } from "./reward-history.controller";

@Module({
  imports: [HttpModule],
  controllers: [RewardHistoryController],
  providers: [JwtStrategy],
})
export class RewardHistoryModule {}

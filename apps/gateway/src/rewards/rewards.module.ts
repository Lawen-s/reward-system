import { Module } from "@nestjs/common";
import { RewardsController } from "./rewards.controller";
import { HttpModule } from "@nestjs/axios";
import { JwtStrategy } from "src/common/jwt.strategy";
@Module({
  imports: [HttpModule],
  controllers: [RewardsController],
  providers: [JwtStrategy],
})
export class RewardsModule {}

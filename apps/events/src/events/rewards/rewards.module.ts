import { MongooseModule } from "@nestjs/mongoose";
import { Rewards, RewardsSchema } from "./schema/rewards.schema";
import { Module } from "@nestjs/common";
import { RewardsController } from "./rewards.controller";
import { RewardsService } from "./rewards.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rewards.name, schema: RewardsSchema }]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}

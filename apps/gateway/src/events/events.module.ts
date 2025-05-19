import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtStrategy } from "src/common/jwt.strategy";
import { EventController } from "./events.controller";

@Module({
  imports: [HttpModule],
  providers: [JwtStrategy],
  controllers: [EventController],
})
export class EventModule {}

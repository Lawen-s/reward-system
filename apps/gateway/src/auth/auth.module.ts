import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { HttpModule } from "@nestjs/axios";
import { JwtStrategy } from "src/common/jwt.strategy";

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}

import { HttpService } from "@nestjs/axios";
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "src/interface/request-user.interface";
import { firstValueFrom } from "rxjs";
import { RolesGuard } from "src/common/roles.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly httpService: HttpService) {}
  @Post("login")
  async login(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3000/users/login", body)
    );
    return response.data;
  }

  @Post("sign-up")
  async signUp(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3000/users", body)
    );
    return response.data;
  }

  @UseGuards(AuthGuard("user"))
  @Get("me")
  async me(@Req() req: RequestWithUser) {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3000/users/me", {
        headers: { "x-user-id": req.user.id },
      })
    );
    return response.data;
  }

  @UseGuards(AuthGuard("user"), RolesGuard)
  @SetMetadata("roles", ["ADMIN"])
  @Get("all")
  async all() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3000/users/all")
    );
    return response.data;
  }

  @UseGuards(AuthGuard("user"), RolesGuard)
  @SetMetadata("roles", ["ADMIN"])
  @Patch("update-role")
  async updateRole(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.patch("http://localhost:3000/users/update", body)
    );
    return response.data;
  }
}

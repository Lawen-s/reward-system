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
import { RequestWithUser } from "src/common/interface/request-user.interface";
import { firstValueFrom } from "rxjs";
import { RolesGuard } from "src/common/roles.guard";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post("login")
  @ApiOperation({ summary: "로그인" })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    console.log(body);
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3000/users/login", body)
    );
    return response.data;
  }

  @Post("sign-up")
  @ApiOperation({ summary: "회원가입" })
  @ApiBody({ type: CreateUserDto })
  async signUp(@Body() body: CreateUserDto) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3000/users", body)
    );
    return response.data;
  }

  @UseGuards(AuthGuard("user"))
  @Get("me")
  @ApiOperation({ summary: "내정보 조회" })
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
  @ApiOperation({ summary: "모든 유저 조회" })
  async all() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3000/users/all")
    );
    return response.data;
  }

  @UseGuards(AuthGuard("user"), RolesGuard)
  @SetMetadata("roles", ["ADMIN"])
  @Patch("update-role")
  @ApiOperation({ summary: "유저 권한 업데이트" })
  @ApiBody({ type: UpdateUserDto })
  async updateRole(@Body() body: UpdateUserDto) {
    const response = await firstValueFrom(
      this.httpService.patch("http://localhost:3000/users/update", body)
    );
    return response.data;
  }
}

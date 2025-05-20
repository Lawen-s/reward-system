import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UnauthorizedException,
  Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update.dto";

interface RequestWithUserId extends Request {
  headers: Request["headers"] & {
    "x-user-id"?: string;
  };
}

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "유저 생성" })
  @ApiCreatedResponse({ description: "유저 생성 성공" })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get("me")
  @ApiOperation({ summary: "유저 조회" })
  @ApiOkResponse({ description: "유저 조회 성공" })
  async findOne(@Req() req: RequestWithUserId) {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      throw new UnauthorizedException("User ID is missing in headers");
    }
    return await this.usersService.findOne(userId);
  }

  @Post("login")
  @ApiOperation({ summary: "로그인" })
  @ApiOkResponse({ description: "로그인 성공" })
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @Patch("update")
  @ApiOperation({ summary: "유저 정보 수정" })
  @ApiOkResponse({ description: "유저 정보 수정 성공" })
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @Get("all")
  @ApiOperation({ summary: "모든 유저 조회" })
  @ApiOkResponse({ description: "모든 유저 조회 성공" })
  async findAll() {
    return await this.usersService.findAll();
  }
}

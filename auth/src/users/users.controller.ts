import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "유저 생성" })
  @ApiCreatedResponse({ description: "유저 생성 성공" })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "모든 유저 조회" })
  @ApiOkResponse({ description: "모든 유저 조회 성공" })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "유저 조회" })
  @ApiOkResponse({ description: "유저 조회 성공" })
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post("login")
  @ApiOperation({ summary: "로그인" })
  @ApiOkResponse({ description: "로그인 성공" })
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
}

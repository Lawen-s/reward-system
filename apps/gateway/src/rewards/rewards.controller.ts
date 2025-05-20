import { HttpService } from "@nestjs/axios";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  SetMetadata,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/roles.guard";
import { firstValueFrom } from "rxjs";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateRewardDto } from "./dto/create-reward.dto";
import { RequestRewardDto } from "./dto/request-reward.dto";

@ApiTags("rewards")
@ApiBearerAuth()
@UseGuards(AuthGuard("user"), RolesGuard)
@Controller("rewards")
export class RewardsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  @ApiOperation({ summary: "리워드 전체 조회" })
  @ApiResponse({ status: 200, description: "리워드 목록 반환" })
  async getRewards() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/rewards")
    );
    return response.data;
  }

  @Get(":id")
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  @ApiOperation({ summary: "리워드 상세 조회" })
  @ApiResponse({ status: 200, description: "리워드 상세 반환" })
  async getRewardById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/rewards/${id}`)
    );
    return response.data;
  }

  @Post()
  @SetMetadata("roles", ["ADMIN", "OPERATOR"])
  @ApiOperation({ summary: "리워드 생성" })
  @ApiBody({ description: "리워드 생성 데이터", type: CreateRewardDto })
  @ApiResponse({ status: 201, description: "리워드 생성됨" })
  async createReward(@Body() body: CreateRewardDto) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/rewards", body)
    );
    return response.data;
  }

  @Post("request")
  @SetMetadata("roles", ["USER"])
  @ApiOperation({ summary: "리워드 요청" })
  @ApiBody({ description: "리워드 요청 데이터", type: RequestRewardDto })
  @ApiResponse({ status: 201, description: "리워드 요청됨" })
  async requestReward(@Body() body: RequestRewardDto) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/rewards/request", body)
    );
    return response.data;
  }
}

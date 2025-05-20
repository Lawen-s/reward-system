import { HttpService } from "@nestjs/axios";
import {
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
  Body,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";
import { RolesGuard } from "src/common/roles.guard";
import { CreateEventDto } from "./dto/create-event.dto";

@Controller("events")
@ApiTags("events")
@UseGuards(AuthGuard("user"), RolesGuard)
@SetMetadata("roles", ["ADMIN", "OPERATOR"])
export class EventController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  @ApiOperation({ summary: "이벤트 전체 조회" })
  async getEvents() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/events")
    );
    return response.data;
  }

  @ApiOperation({ summary: "이벤트 상세 조회" })
  @Get(":id")
  async getEventById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/events/${id}`)
    );
    return response.data;
  }

  @ApiOperation({ summary: "이벤트 생성" })
  @ApiBody({ description: "이벤트 생성 데이터", type: CreateEventDto }) // DTO가 있다면 Object 대신 DTO로 교체
  @Post()
  async createEvent(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/events", body)
    );
    return response.data;
  }
}

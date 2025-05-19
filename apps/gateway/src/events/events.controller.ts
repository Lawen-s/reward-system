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
import { firstValueFrom } from "rxjs";
import { RolesGuard } from "src/common/roles.guard";

@Controller("events")
@UseGuards(AuthGuard("user"), RolesGuard)
@SetMetadata("roles", ["ADMIN", "OPERATOR"])
export class EventController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getEvents() {
    const response = await firstValueFrom(
      this.httpService.get("http://localhost:3002/events")
    );
    return response.data;
  }

  @Get(":id")
  async getEventById(@Param("id") id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3002/events/${id}`)
    );
    return response.data;
  }

  @Post()
  async createEvent(@Body() body: any) {
    const response = await firstValueFrom(
      this.httpService.post("http://localhost:3002/events", body)
    );
    return response.data;
  }
}

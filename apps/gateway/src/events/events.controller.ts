import { HttpService } from "@nestjs/axios";
import { Controller } from "@nestjs/common";

@Controller("event")
export class EventController {
  constructor(private readonly httpService: HttpService) {}
}

import { IsNumber } from "class-validator";

export class UpdateEventRewardDto {
  @IsNumber()
  quantity: number;
}

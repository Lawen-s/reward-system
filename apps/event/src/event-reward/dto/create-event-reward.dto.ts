import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventRewardDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  rewardId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

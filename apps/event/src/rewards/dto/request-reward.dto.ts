import { IsNotEmpty, IsString } from "class-validator";

export class RequestRewardDto {
  @IsString()
  @IsNotEmpty()
  rewardId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  eventId: string;
}

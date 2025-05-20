import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRewardHistoryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  eventRewardId: string;

  @IsNotEmpty()
  success: boolean;

  @IsOptional()
  @IsString()
  reason: string;
}

import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RewardType } from "src/common/reward-type.enum";

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(RewardType)
  type: string;

  @IsDateString()
  @IsNotEmpty()
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  endAt: Date;
}

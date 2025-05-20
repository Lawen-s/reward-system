import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RewardType } from "src/common/enum/reward-type.enum";

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "리워드 제목", example: "로그인 3회" })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "리워드 설명",
    example: "로그인 3회 이상 시 리워드 제공",
  })
  description: string;

  @IsString()
  @IsEnum(RewardType)
  @ApiProperty({ description: "리워드 타입", enum: RewardType })
  type: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: "리워드 시작 일자" })
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: "리워드 종료 일자" })
  endAt: Date;
}

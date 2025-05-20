import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RequestRewardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "리워드 ID",
    example: "6829f78a506b5a54ac347d9e",
  })
  rewardId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "사용자 ID",
    example: "6829f78a506b5a54ac347d9e",
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "이벤트 ID",
    example: "6829f78a506b5a54ac347d9e",
  })
  eventId: string;
}

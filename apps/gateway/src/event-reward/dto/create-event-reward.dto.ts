import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEventRewardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "이벤트 ID",
    example: "6829f78a506b5a54ac347d9e",
  })
  eventId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "리워드 ID",
    example: "6829f78a506b5a54ac347d9e",
  })
  rewardId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "이벤트 보상 남은 수량", example: 10 })
  quantity: number;
}

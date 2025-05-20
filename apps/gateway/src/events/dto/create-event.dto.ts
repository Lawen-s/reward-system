import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString, IsNumber } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "이벤트 제목", example: "이벤트 제목" })
  title: string;

  @IsString()
  @ApiProperty({ description: "이벤트 설명", example: "이벤트 설명" })
  description: string;

  @IsDateString()
  @ApiProperty({ description: "이벤트 시작 일자", example: "2021-01-01" })
  startAt: Date;

  @IsDateString()
  @ApiProperty({ description: "이벤트 종료 일자", example: "2021-01-01" })
  endAt: Date;

  @IsString()
  @ApiProperty({ description: "이벤트 카테고리", example: "이벤트 카테고리" })
  category: string;

  @IsNumber()
  @ApiProperty({ description: "이벤트 달성 기준", example: 10 })
  requiredNumber: number;
}

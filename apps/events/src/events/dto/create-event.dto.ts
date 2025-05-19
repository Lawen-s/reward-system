import { IsNotEmpty, IsString, IsDateString, IsNumber } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsString()
  category: string;

  @IsNumber()
  requiredNumber: number;
}

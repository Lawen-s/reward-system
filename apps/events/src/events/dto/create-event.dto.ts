import { IsNotEmpty, IsString, IsDateString } from "class-validator";

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
}

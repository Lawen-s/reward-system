import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  startAt: Date;

  @IsString()
  endAt: Date;

  @IsString()
  category: string;
}

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserEventProgressDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsNumber()
  @IsNotEmpty()
  progress: number;
}

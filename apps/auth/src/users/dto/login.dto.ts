import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: "유저 이메일" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: "유저 비밀번호" })
  @IsString()
  readonly password: string;
}

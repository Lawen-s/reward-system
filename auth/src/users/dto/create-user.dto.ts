import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "유저 이름" })
  readonly name: string;

  @ApiProperty({ description: "유저 이메일" })
  readonly email: string;

  @ApiProperty({ description: "유저 비밀번호" })
  readonly password: string;
}

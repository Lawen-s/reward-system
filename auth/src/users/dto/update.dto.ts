import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../../common/enum/user.enum";

export class UpdateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  @IsEnum(UserRole)
  readonly role: string;
}

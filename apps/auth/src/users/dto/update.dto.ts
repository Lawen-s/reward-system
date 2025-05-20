import { IsEnum, IsString } from "class-validator";
import { UserRole } from "src/common/role.enum";

export class UpdateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  @IsEnum(UserRole)
  readonly role: string;
}

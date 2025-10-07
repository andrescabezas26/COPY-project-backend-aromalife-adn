import { IsArray, IsEnum, ArrayNotEmpty } from 'class-validator';
import { ValidRoles } from '../interfaces/valid-roles';

export class UpdateUserRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ValidRoles, { each: true })
  roles: ValidRoles[];
}

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role, Status } from 'src/shared/enums/role.enum';

export class CreateAccountDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsEnum(Role, {
    message: `role must be a valid enum value. Valid options are ${Object.keys(
      Role,
    )}`,
  })
  role: Role;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    },
    {
      message:
        'Password is too weak. Minimal length is $constraint1 characters and must contain at least 1 uppercase letter, 1 lowercase letter, 1 number.',
    },
  )
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  salt: string;

  @IsEnum(Status)
  status: string;

  @IsBoolean()
  is_active: boolean;
}

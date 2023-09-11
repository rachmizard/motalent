import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    name: 'name',
    example: 'Yusuf',
    description: 'The name of the Account',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    name: 'email',
    example: 'john@mail.com',
    description: 'The email of the Account',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    name: 'role',
  })
  @IsEnum(Role, {
    message: `role must be a valid enum value. Valid options are ${Object.keys(
      Role,
    )}`,
  })
  role: Role;

  @ApiProperty({
    name: 'password',
  })
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

  @ApiProperty({
    name: 'salt',
  })
  @IsOptional()
  @IsString()
  salt: string;

  @ApiProperty({
    name: 'status',
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    name: 'is_active',
  })
  @IsBoolean()
  is_active: boolean;
}

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@src/shared/decorators/match.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateAccountDTO } from './create-account.dto';

export class UpdateAccountDTO extends PartialType(CreateAccountDTO) {
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
    description: 'Account ID',
    example: '1',
    name: 'id',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @Match('password', {
    message: 'Password confirmation does not match',
  })
  password_confirmation?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class SignInDTO {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'The email of the Account',
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the Account',
  })
  @IsNotEmpty()
  password: string;
}

export class SignUpDTO {
  @ApiProperty({
    example: 'Yusuf',
    description: 'The name of the Account',
    required: true,
    minLength: 3,
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(3, {
    message: 'Name is too short. Minimal length is $constraint1 characters',
  })
  name: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'The email of the Account',
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the Account',
    required: true,
    minLength: 6,
    nullable: false,
    format: 'password',
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
  password: string;

  @ApiProperty({
    description: 'The password confirmation of the Account',
    required: true,
    minLength: 6,
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Password confirmation is required',
  })
  @Match('password', {
    message: 'Password confirmation does not match',
  })
  password_confirmation: string;
}

export class SignInResponseDTO {
  @ApiProperty({
    name: 'access_token',
    example: 'someToken...',
    description: 'The access token of the Account',
  })
  access_token: string;
}

export class SignUpResponseDTO {
  @ApiProperty()
  message: string;

  @ApiProperty({
    name: 'access_token',
    example: 'someToken...',
    description: 'The access token of the Account',
  })
  access_token: string;
}

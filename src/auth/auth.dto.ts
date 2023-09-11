import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpDTO {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MinLength(3, {
    message: 'Name is too short. Minimal length is $constraint1 characters',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

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

  @IsNotEmpty({
    message: 'Password confirmation is required',
  })
  @Match('password', {
    message: 'Password confirmation does not match',
  })
  password_confirmation: string;
}

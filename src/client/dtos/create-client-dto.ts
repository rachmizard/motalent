import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@src/shared/enums/gender.enum';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum BloodTypeEnum {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export class CreateClientDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;

  @IsNumber()
  age?: number;

  @ApiProperty()
  @IsISO8601()
  @IsOptional()
  dob?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @ApiProperty()
  @IsEnum(BloodTypeEnum)
  @IsOptional()
  blood_type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  province_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  regency_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  district_id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  village_id?: string;

  @ApiProperty()
  @IsNumber()
  account_id?: number;
}

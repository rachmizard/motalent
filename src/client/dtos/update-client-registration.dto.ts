import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '@src/shared/enums/gender.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ClientProfileDTO {
  @ApiProperty({
    description: 'Client name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Client age',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Client date of birth',
    type: Date,
  })
  @IsISO8601()
  @IsOptional()
  dob: Date | string;

  @ApiProperty({
    description: 'Client address',
    type: String,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Client blood type',
    type: String,
  })
  @IsString()
  @IsOptional()
  blood_type: string;

  @ApiProperty({
    description: 'Client gender',
    type: String,
    enum: ['male', 'female'],
  })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;
}

class ClientLocationDTO {
  @ApiProperty({
    description: 'Client province id',
    type: String,
  })
  @IsString()
  @IsOptional()
  province_id: string | null;

  @ApiProperty({
    description: 'Client regency id',
    type: String,
  })
  @IsString()
  @IsOptional()
  regency_id: string | null;

  @ApiProperty({
    description: 'Client district id',
    type: String,
  })
  @IsString()
  @IsOptional()
  district_id: string | null;

  @ApiProperty({
    description: 'Client village id',
    type: String,
  })
  @IsString()
  @IsOptional()
  village_id: string | null;
}

export class ClientSearchPreferencesDTO {
  @ApiProperty({
    description: 'Talent category ids',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  category_ids: string[] | null;

  @ApiProperty({
    description: 'Talent province id',
    type: String,
  })
  @IsString()
  @IsOptional()
  province_id: string | null;

  @ApiProperty({
    description: 'Talent city id',
    type: String,
  })
  @IsString()
  @IsOptional()
  regency_id: string | null;

  @ApiProperty({
    description: 'Talent district id',
    type: String,
  })
  @IsString()
  @IsOptional()
  district_id: string | null;

  @ApiProperty({
    description: 'Talent village id',
    type: String,
  })
  @IsString()
  @IsOptional()
  village_id: string | null;

  @ApiProperty({
    description: 'Talent min price',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  min_price: number | null;

  @ApiProperty({
    description: 'Talent max price',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  max_price: number | null;

  @ApiProperty({
    description: 'Talent min age',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  min_age: number | null;

  @ApiProperty({
    description: 'Talent max age',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  max_age: number | null;

  @ApiProperty({
    description: 'Talent is negotiable',
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  is_negotiable: boolean | null;

  @ApiProperty({
    description: 'Talent is down payment',
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  is_dp: boolean | null;
}

export class UpdateClientRegistrationDTO {
  @ApiProperty({
    description: 'Client id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty({
    description: 'Client profile data',
    type: ClientProfileDTO,
  })
  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ClientProfileDTO)
  profile: ClientProfileDTO;

  @ApiProperty({
    description: 'Client location data',
    type: ClientLocationDTO,
  })
  @IsDefined()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ClientLocationDTO)
  location: ClientLocationDTO;

  @ApiProperty({
    description: 'Client search preferences data',
    isArray: true,
    type: ClientSearchPreferencesDTO,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ClientSearchPreferencesDTO)
  search_preferences: ClientSearchPreferencesDTO[];
}

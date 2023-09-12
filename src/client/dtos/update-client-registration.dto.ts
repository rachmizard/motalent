import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';

class ClientProfileDTO {
  @ApiProperty({
    description: 'Client name',
    type: String,
  })
  @IsNotEmpty({
    message: 'Client name is required',
  })
  name: string;

  @ApiProperty({
    description: 'Client age',
    type: Number,
  })
  @IsNotEmpty({
    message: 'Client name is required',
  })
  age: number;

  @ApiProperty({
    description: 'Client date of birth',
    type: Date,
  })
  @IsDateString()
  @IsOptional()
  dob: Date | string;

  @ApiProperty({
    description: 'Client address',
    type: String,
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Client blood type',
    type: String,
  })
  @IsOptional()
  blood_type: string;

  @ApiProperty({
    description: 'Client gender',
    type: String,
  })
  @IsOptional()
  gender: string;
}

class ClientLocationDTO {
  @ApiProperty({
    description: 'Client province id',
    type: String,
  })
  @IsOptional()
  province_id: string | null;

  @ApiProperty({
    description: 'Client city id',
    type: String,
  })
  @IsOptional()
  city_id: string | null;

  @ApiProperty({
    description: 'Client district id',
    type: String,
  })
  @IsOptional()
  district_id: string | null;
}

class ClientSeachPreferencesDTO {
  @ApiProperty({
    description: 'Talent category ids',
    type: [String],
  })
  category_ids: string[] | null;

  @ApiProperty({
    description: 'Talent province ids',
    type: [String],
  })
  province_ids: string[] | null;

  @ApiProperty({
    description: 'Talent city ids',
    type: [String],
  })
  city_ids: string[] | null;

  @ApiProperty({
    description: 'Talent district ids',
    type: [String],
  })
  district_ids: string[] | null;

  @ApiProperty({
    description: 'Talent min price',
    type: Number,
  })
  min_price: number | null;

  @ApiProperty({
    description: 'Talent max price',
    type: Number,
  })
  max_price: number | null;

  @ApiProperty({
    description: 'Talent min age',
    type: Number,
  })
  min_age: number | null;

  @ApiProperty({
    description: 'Talent max age',
    type: Number,
  })
  max_age: number | null;

  @ApiProperty({
    description: 'Talent is negotiable',
    type: Boolean,
  })
  is_negotiable: boolean | null;

  @ApiProperty({
    description: 'Talent is down payment',
    type: Boolean,
  })
  is_dp: boolean | null;
}

export class UpdateClientRegistrationDTO {
  @ApiProperty({
    description: 'Client profile data',
    type: ClientProfileDTO,
  })
  @IsNotEmptyObject({
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Client profile data is required',
  })
  profile: ClientProfileDTO;

  @ApiProperty({
    description: 'Client location data',
    type: ClientLocationDTO,
  })
  @IsNotEmptyObject({
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Client location data is required',
  })
  location: ClientLocationDTO;

  @ApiProperty({
    description: 'Client search preferences data',
    type: ClientSeachPreferencesDTO,
  })
  @IsNotEmptyObject({
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Client search preferences data is required',
  })
  search_preferences: ClientSeachPreferencesDTO;
}

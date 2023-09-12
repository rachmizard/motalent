import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VillageQueryParamsDTO {
  @ApiProperty({
    example: '320323',
  })
  @IsNotEmpty({
    message: 'district_id is required',
  })
  @IsString()
  district_id: string;
}

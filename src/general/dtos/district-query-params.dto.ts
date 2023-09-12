import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DistrictQueryParamsDTO {
  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty({
    message: 'regency_id is required',
  })
  @IsString()
  regency_id: string;
}

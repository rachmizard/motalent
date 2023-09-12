import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegencyQueryParamsDTO {
  @ApiProperty({
    example: '32',
  })
  @IsNotEmpty({
    message: 'province_id is required',
  })
  @IsString()
  province_id: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class RegencyQueryParamsDTO {
  @IsNotEmpty({
    message: 'province_id is required',
  })
  @IsString()
  province_id: string;
}

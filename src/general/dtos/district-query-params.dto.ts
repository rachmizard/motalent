import { IsNotEmpty, IsString } from 'class-validator';

export class DistrictQueryParamsDTO {
  @IsNotEmpty({
    message: 'regency_id is required',
  })
  @IsString()
  regency_id: string;
}

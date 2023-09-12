import { IsNotEmpty, IsString } from 'class-validator';

export class VillageQueryParamsDTO {
  @IsNotEmpty({
    message: 'district_id is required',
  })
  @IsString()
  district_id: string;
}

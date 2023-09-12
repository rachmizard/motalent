import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { LocationService } from './location.service';
import { Public } from '@src/auth/auth.decorator';
import { RegencyQueryParamsDTO } from './dtos/regency-query-params.dto';
import { DistrictQueryParamsDTO } from './dtos/district-query-params.dto';
import { VillageQueryParamsDTO } from './dtos/village-query-params.dto';

@Controller()
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('provinces')
  @Public()
  @HttpCode(HttpStatus.OK)
  getProvinces() {
    return this.locationService.getProvinces();
  }

  @Get('regencies')
  @Public()
  @HttpCode(HttpStatus.OK)
  getRegencies(@Query() params: RegencyQueryParamsDTO) {
    return this.locationService.getRegencies(params.province_id);
  }

  @Get('districts')
  @Public()
  @HttpCode(HttpStatus.OK)
  getDistricts(@Query() params: DistrictQueryParamsDTO) {
    return this.locationService.getDistricts(params.regency_id);
  }

  @Get('villages')
  @Public()
  @HttpCode(HttpStatus.OK)
  getVillages(@Query() params: VillageQueryParamsDTO) {
    return this.locationService.getVillages(params.district_id);
  }
}

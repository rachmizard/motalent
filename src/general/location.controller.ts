import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/auth/auth.decorator';
import { DistrictQueryParamsDTO } from './dtos/district-query-params.dto';
import { RegencyQueryParamsDTO } from './dtos/regency-query-params.dto';
import { VillageQueryParamsDTO } from './dtos/village-query-params.dto';
import {
  DistrictDTO,
  ProvinceDTO,
  RegencyDTO,
  VillageDTO,
} from './location.dto';
import { LocationService } from './location.service';

@ApiTags('General')
@Controller()
@UseInterceptors(CacheInterceptor)
export class LocationController {
  constructor(private locationService: LocationService) {}

  @ApiResponse({
    type: ProvinceDTO,
    isArray: true,
    description: 'Get all provinces',
    status: HttpStatus.OK,
  })
  @Get('provinces')
  @Public()
  @HttpCode(HttpStatus.OK)
  getProvinces() {
    return this.locationService.getProvinces();
  }

  @ApiResponse({
    description: 'Get all regencies',
    status: HttpStatus.OK,
    isArray: true,
    type: RegencyDTO,
  })
  @Get('regencies')
  @Public()
  @HttpCode(HttpStatus.OK)
  getRegencies(@Query() params: RegencyQueryParamsDTO) {
    return this.locationService.getRegencies(params.province_id);
  }

  @ApiResponse({
    description: 'Get all districts',
    status: HttpStatus.OK,
    isArray: true,
    type: DistrictDTO,
  })
  @Get('districts')
  @Public()
  @HttpCode(HttpStatus.OK)
  getDistricts(@Query() params: DistrictQueryParamsDTO) {
    return this.locationService.getDistricts(params.regency_id);
  }

  @ApiResponse({
    description: 'Get all villages',
    status: HttpStatus.OK,
    isArray: true,
    type: VillageDTO,
  })
  @Get('villages')
  @Public()
  @HttpCode(HttpStatus.OK)
  getVillages(@Query() params: VillageQueryParamsDTO) {
    return this.locationService.getVillages(params.district_id);
  }
}

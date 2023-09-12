import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  DistrictDTO,
  ProvinceDTO,
  RegencyDTO,
  VillageDTO,
} from './location.dto';

type ObservableWithAxiosResponse<T> = Observable<AxiosResponse<T>>;

@Injectable()
export class LocationService {
  constructor(private httpService: HttpService) {}

  getProvinces(): ObservableWithAxiosResponse<ProvinceDTO[]> {
    return this.httpService
      .get('/provinces.json')
      .pipe(map(({ data }) => data))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  getRegencies(provinceId: string): ObservableWithAxiosResponse<RegencyDTO[]> {
    return this.httpService
      .get(`/regencies/${provinceId}.json`)
      .pipe(map(({ data }) => data))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  getDistricts(regencyId: string): ObservableWithAxiosResponse<DistrictDTO[]> {
    return this.httpService
      .get(`/districts/${regencyId}.json`)
      .pipe(map(({ data }) => data))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  getVillages(districtId: string): ObservableWithAxiosResponse<VillageDTO[]> {
    return this.httpService
      .get(`/villages/${districtId}.json`)
      .pipe(map(({ data }) => data))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }
}

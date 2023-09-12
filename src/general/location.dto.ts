export type ProvinceDTO = {
  id: string;
  name: string;
};

export type RegencyDTO = {
  id: string;
  name: string;
  id_provinsi: string;
};

export type DistrictDTO = {
  id: string;
  name: string;
  id_kabupaten: string;
};

export type VillageDTO = {
  id: string;
  name: string;
  id_kecamatan: string;
};

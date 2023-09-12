import { ApiProperty } from '@nestjs/swagger';

export class ProvinceDTO {
  @ApiProperty({
    example: '32',
  })
  id: string;

  @ApiProperty({
    example: 'Jawa Barat',
  })
  name: string;
}

export class RegencyDTO {
  @ApiProperty({
    example: '3203',
  })
  id: string;

  @ApiProperty({
    example: 'Kabupaten Bandung',
  })
  name: string;

  @ApiProperty({
    example: '32',
  })
  id_provinsi: string;
}

export class DistrictDTO {
  @ApiProperty({
    example: '320323',
  })
  id: string;

  @ApiProperty({
    example: 'Kecamatan Cilengkrang',
  })
  name: string;

  @ApiProperty({
    example: '3203',
  })
  id_kabupaten: string;
}

export class VillageDTO {
  @ApiProperty({
    example: '3203232001',
  })
  id: string;

  @ApiProperty({
    example: 'Desa Cilengkrang',
  })
  name: string;

  @ApiProperty({
    example: '320323',
  })
  id_kecamatan: string;
}

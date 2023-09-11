import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/shared/enums/role.enum';

export class GetAccountDTO {
  @ApiProperty({
    name: 'id',
    description: 'The id of the Account',
    example: '1',
  })
  id: string;

  @ApiProperty({
    name: 'name',
  })
  name: string;

  @ApiProperty({
    name: 'email',
  })
  email: string;

  @ApiProperty({
    name: 'role',
    type: 'enum',
    enum: ['admin', 'user'],
  })
  role: string;

  @ApiProperty({
    name: 'status',
    type: 'enum',
    enum: ['active', 'inactive'],
  })
  status: Status;

  @ApiProperty({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @ApiProperty({
    name: 'created_at',
    default: new Date(),
  })
  created_at: Date;

  @ApiProperty({
    name: 'updated_at',
    default: new Date(),
  })
  updated_at: Date;
}

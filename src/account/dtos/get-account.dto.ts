import { ApiProperty } from '@nestjs/swagger';
import { ClientDTO } from 'src/client/dtos/client-dto';
import { Status } from 'src/shared/enums/role.enum';

export class GetAccountDTO {
  constructor(partial: Partial<GetAccountDTO>) {
    Object.assign(this, partial);
  }

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
    name: 'has_complete_registration',
    type: 'boolean',
    default: false,
  })
  has_complete_registration: boolean;

  @ApiProperty({
    type: ClientDTO,
  })
  client: ClientDTO;

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

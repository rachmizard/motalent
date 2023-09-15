import { ApiProperty } from '@nestjs/swagger';

export class ClientDTO {
  @ApiProperty({
    name: 'id',
    description: 'The id of the Client',
    example: '1',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    description: 'The name of the Client',
    example: 'Yusuf',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'The email of the Client',
    example: 'jojon@mail.com',
  })
  bio: string;

  @ApiProperty({
    name: 'age',
    description: 'The age of the Client',
    example: 20,
  })
  age: number;

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

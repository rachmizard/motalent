import { ClientEntity } from '@src/client/entities/client.entity';
import { Role, Status } from 'src/shared/enums/role.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'accounts',
})
export class AccountEntity {
  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  password: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'client', 'talent'],
    default: 'client',
    nullable: true,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
    nullable: true,
  })
  status: Status;

  @Column({
    type: 'bool',
    default: true,
    nullable: true,
  })
  is_active: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  salt: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  refresh_token: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  has_complete_registration: boolean;

  @OneToOne(() => ClientEntity, (account) => account.account, {
    eager: true,
  })
  @JoinColumn({
    name: 'client_id',
  })
  client: ClientEntity;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;
}

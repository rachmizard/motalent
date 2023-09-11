import { Role, Status } from 'src/shared/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

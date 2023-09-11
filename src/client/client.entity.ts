import { AccountEntity } from 'src/account/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'clients',
})
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500,
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    length: 500,
    type: 'varchar',
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'int',
    default: 0,
  })
  age: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToOne(() => AccountEntity, (account) => account.client)
  @JoinColumn({
    name: 'account_id',
  })
  account: AccountEntity;
}

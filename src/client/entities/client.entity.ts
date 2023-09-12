import { AccountEntity } from 'src/account/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientSearchPreferenceEntity } from './client-search-preference.entity';
import { GenderEnum } from '@src/shared/enums/gender.enum';

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
    type: 'date',
    nullable: true,
  })
  dob: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    nullable: true,
  })
  gender: GenderEnum;

  @Column({
    type: 'enum',
    enum: ['A', 'B', 'AB', 'O'],
    default: 'A',
    nullable: true,
  })
  blood_type: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  province_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  regency_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  district_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  village_id: string;

  @OneToOne(() => AccountEntity, (account) => account.client)
  @JoinColumn({
    name: 'account_id',
  })
  account: AccountEntity;

  @OneToMany(
    () => ClientSearchPreferenceEntity,
    (search_preference) => search_preference.client,
  )
  @JoinColumn()
  search_preferences: ClientSearchPreferenceEntity[];

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
}

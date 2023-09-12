import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({
  name: 'client_search_preferences',
})
export class ClientSearchPreferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  min_age: number;

  @Column()
  max_age: number;

  @Column()
  min_price: number;

  @Column()
  max_price: number;

  @Column()
  is_negotiable: boolean;

  @Column()
  is_dp: boolean;

  @ManyToOne(() => ClientEntity, (client) => client.search_preferences)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

export enum JobPostingStatusType {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum PaymentType {
  Hourly = 'hourly',
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export enum DownPaymentType {
  Percentage = 'percentage',
  Exact = 'exact',
}

export enum JobType {
  Parttime = 'parttime',
  Contract = 'contract',
}

export enum ContractDurationType {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

@Entity({
  name: 'client_job_postings',
})
export class ClientJobPostingEntity {
  @PrimaryColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({
    type: 'enum',
    enum: JobPostingStatusType,
    default: JobPostingStatusType.Draft,
  })
  public status: JobPostingStatusType;

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.Hourly,
  })
  public payment_type: PaymentType;

  @Column({
    type: 'int',
    default: 0,
  })
  public payment_fee: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public min_payment_fee: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public max_payment_fee: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_down_payment: boolean;

  @Column({
    type: 'int',
    default: 0,
  })
  public down_payment_fee: number;

  @Column({
    type: 'enum',
    enum: DownPaymentType,
    default: DownPaymentType.Percentage,
  })
  public down_payment_type: DownPaymentType;

  @Column({
    type: 'int',
    default: 0,
  })
  public down_payment_percentage: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_negotiable: boolean;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.Parttime,
  })
  public job_type: JobType;

  @Column({
    type: 'int',
    default: 0,
  })
  public contract_duration: number;

  @Column({
    type: 'enum',
    enum: ContractDurationType,
    default: ContractDurationType.Day,
  })
  public contract_duration_type: ContractDurationType;
  public contract_start_date: Date;
  public contract_end_date: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  public is_immediately_proceed: boolean;

  @Column({
    type: 'int',
    default: 0,
  })
  public max_applications: number;

  @Column({
    type: 'double precision',
    default: 0,
  })
  public latitude: number;

  @Column({
    type: 'double precision',
    default: 0,
  })
  public longitude: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public radius: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public province_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public regency_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public district_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public village_id: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  public address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public location: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updated_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public expired_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public published_at: Date;

  @ManyToOne(() => ClientEntity, (client) => client.client_job_postings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinColumn({ name: 'client_id' })
  public client: Promise<ClientEntity> | ClientEntity;
}

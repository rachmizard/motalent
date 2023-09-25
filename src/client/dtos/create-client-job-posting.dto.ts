import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  ContractDurationType,
  DownPaymentType,
  JobPostingStatusType,
  JobType,
  PaymentType,
} from './../entities/client-job-postings.entity';

export class CreateClientJobPostingDTO {
  @ApiProperty({
    description: 'Client ID',
    type: String,
    default: '1',
  })
  @IsString()
  @IsNotEmpty()
  public client_id: string;

  @ApiProperty({
    description: 'Title of job posting',
    type: String,
    default: 'Job Posting Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of job posting',
    type: String,
    default: 'Job Posting Description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Status of job posting',
    enum: JobPostingStatusType,
    enumName: 'JobPostingStatusType',
  })
  @IsEnum(JobPostingStatusType)
  status: JobPostingStatusType;

  @ApiProperty({
    description: 'Payment type of job posting',
    enum: PaymentType,
    enumName: 'PaymentType',
  })
  @IsEnum(PaymentType)
  payment_type: PaymentType;

  @ApiProperty({
    description: 'Payment fee of job posting',
    type: Number,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  payment_fee: number;

  @ApiProperty({
    description: 'Minimum payment fee of job posting',
    type: Number,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  min_payment_fee: number;

  @ApiProperty({
    description: 'Down payment percentage of job posting',
    type: Number,
    minimum: 0,
    maximum: 100,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  down_payment_percentage: number;

  @ApiProperty({
    description: 'Whether job posting has down payment',
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  is_down_payment: boolean;

  @ApiProperty({
    description: 'Down payment type of job posting',
    enum: DownPaymentType,
    enumName: 'DownPaymentType',
  })
  @IsEnum(DownPaymentType)
  down_payment_type: DownPaymentType;

  @ApiProperty({
    description: 'Down payment fee of job posting',
    type: Number,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  down_payment_fee: number;

  @ApiProperty({
    description: 'Whether job posting is negotiable',
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  is_negotiable: boolean;

  @ApiProperty({
    description: 'Type of job',
    enum: JobType,
    enumName: 'JobType',
  })
  @IsEnum(JobType)
  job_type: JobType;

  @ApiProperty({
    description: 'Duration of contract',
    type: Number,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  contract_duration: number;

  @ApiProperty({
    description: 'Type of contract duration',
    enum: ContractDurationType,
    enumName: 'ContractDurationType',
  })
  @IsEnum(ContractDurationType)
  contract_duration_type: ContractDurationType;

  @ApiProperty({
    description: 'Start date of contract',
    type: Date,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  contract_start_date?: Date;

  @ApiProperty({
    description: 'End date of contract',
    type: Date,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  contract_end_date?: Date;

  @ApiProperty({
    description: 'Whether job posting is immediately proceed',
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  is_immediately_proceed: boolean;

  @ApiProperty({
    description: 'Maximum number of applications for job posting',
    type: Number,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  max_applications: number;

  @ApiProperty({
    description: 'Latitude of job posting location',
    type: Number,
    default: 0,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Longitude of job posting location',
    type: Number,
    default: 0,
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    description: 'Radius of job posting location',
    type: Number,
    default: 0,
  })
  @IsNumber()
  radius: number;

  @ApiProperty({
    description: 'Province ID of job posting location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  province_id?: string;

  @ApiProperty({
    description: 'Regency ID of job posting location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  regency_id?: string;

  @ApiProperty({
    description: 'District ID of job posting location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  district_id?: string;

  @ApiProperty({
    description: 'Village ID of job posting location',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  village_id?: string;

  @ApiProperty({
    description: 'Address of job posting location',
    type: String,
    default: 'Job Posting Address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Location of job posting',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobPostingsTable1695654662387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create type down_payment_type as ENUM('percentage', 'exact');
        create type job_type as ENUM('parttime', 'contract');
        create type payment_type as ENUM('hourly', 'daily', 'weekly', 'monthly', 'yearly');
        create type job_posting_status_type as ENUM('draft', 'published', 'archived');
        create type contract_duration_type as ENUM('day', 'month', 'year');

    
        CREATE TABLE "client_job_postings" (
            "id" SERIAL NOT NULL,
            "title" character varying NOT NULL,
            "description" character varying NOT NULL,
            "status" job_posting_status_type NOT NULL DEFAULT 'draft',
            
            "payment_type" payment_type NOT NULL DEFAULT 'hourly',
            "payment_fee" integer NOT NULL DEFAULT 0,

            "min_payment_fee" integer NOT NULL DEFAULT 0,
            "max_payment_fee" integer NOT NULL DEFAULT 0,
            
            "is_down_payment" boolean NOT NULL DEFAULT false,
            "down_payment_fee" integer NOT NULL DEFAULT 0,
            "down_payment_type" down_payment_type NOT NULL DEFAULT 'percentage',
            "down_payment_percentage" integer NOT NULL DEFAULT 0,

            "is_negotiable" boolean NOT NULL DEFAULT false,

            "job_type" job_type NOT NULL DEFAULT 'parttime',

            "contract_duration" integer NOT NULL DEFAULT 0,
            "contract_duration_type" contract_duration_type NOT NULL DEFAULT 'day',
            "contract_start_date" TIMESTAMP NULL DEFAULT NULL,
            "contract_end_date" TIMESTAMP NULL DEFAULT NULL,

            "is_immediately_proceed" boolean NOT NULL DEFAULT false,

            "max_applications" integer NOT NULL DEFAULT 0,

            "latitude" double precision NOT NULL DEFAULT 0,
            "longitude" double precision NOT NULL DEFAULT 0,
            "radius" integer NOT NULL DEFAULT 0,
            "province_id" character varying NULL DEFAULT NULL,
            "regency_id" character varying NULL DEFAULT NULL,
            "district_id" character varying NULL DEFAULT NULL,
            "village_id" character varying NULL DEFAULT NULL,
            "address" character varying NOT NULL DEFAULT '',
            "location" character varying NULL DEFAULT NULL,

            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),

            "expired_at" TIMESTAMP NULL DEFAULT NULL,
            "published_at" TIMESTAMP NULL DEFAULT NULL,

            "client_id" integer NOT NULL,

            CONSTRAINT "client_job_postings_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "client_job_postings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "client_job_postings";

        DROP TYPE "down_payment_type";
        DROP TYPE "job_type";
        DROP TYPE "payment_type";
        DROP TYPE "job_posting_status_type";
        DROP TYPE "contract_duration_type";

    `);
  }
}

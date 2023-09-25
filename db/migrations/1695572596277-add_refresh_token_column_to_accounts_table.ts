import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumnToAccountsTable1695572596277
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE accounts
            ADD COLUMN refresh_token TEXT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE accounts
            DROP COLUMN refresh_token
        `);
  }
}

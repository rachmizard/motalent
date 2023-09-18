import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHasCompleteRegistrationColumn1695048864056
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'accounts',
      new TableColumn({
        name: 'has_complete_registration',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('accounts', 'has_complete_registration');
  }
}

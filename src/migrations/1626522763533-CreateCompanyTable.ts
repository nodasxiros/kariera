import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanyTable1626522763533 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'company',
      columns: [
        {
          name: 'id',
          type: 'int',
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'increment',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: true,
          default: null
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
          default: null
        },
      ]
    });
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company');
  }

}

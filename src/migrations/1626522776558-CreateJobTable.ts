import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateJobTable1626522776558 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'job',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('job');
  }

}

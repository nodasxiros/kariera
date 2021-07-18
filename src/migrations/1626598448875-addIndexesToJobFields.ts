import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class addIndexesToJobFields1626598448875 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const titleIndex: Promise<void> =  queryRunner.createIndex('job', new TableIndex({
      name: 'IDX_JOB_TITLE',
      columnNames: ['title']
    }));
    const descriptionIndex: Promise<void> = queryRunner.createIndex('job', new TableIndex({
      name: 'IDX_JOB_DESCRIPTION',
      columnNames: ['description']
    }));
    await Promise.all([
      titleIndex,
      descriptionIndex
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const titleIndex: Promise<void> =  queryRunner.dropIndex('job', 'IDX_JOB_TITLE');
    const descriptionIndex: Promise<void> =  queryRunner.dropIndex('job', 'IDX_JOB_DESCRIPTION');
    await Promise.all([
      titleIndex,
      descriptionIndex
    ]);
  }

}

import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class addOneToManyRelationBetweenCompanyAndJob1626597494519 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('job', new TableColumn({
      name: 'company_id',
      type: 'int'
    }));
    await queryRunner.createForeignKey('job', new TableForeignKey({
      columnNames: ['company_id'],
      referencedTableName: 'company',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('job', 'company_id');
    await queryRunner.dropColumn('job', 'company_id')
  }

}

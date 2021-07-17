import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsersTable1626355100763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            unsigned: true,
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            unsigned: true,
          }
        ]
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}

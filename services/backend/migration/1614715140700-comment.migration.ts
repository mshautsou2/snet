import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class comment1614715140700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isUnique: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: 'content',
                    type: 'varchar',
                },
                {
                    name: 'date',
                    type: 'timestamp',
                },
                {
                    name: 'message_id',
                    type: 'uuid',
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
            ]
        }), true)


        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['owner_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
        }));

        await queryRunner.createForeignKey('comment', new TableForeignKey({
            columnNames: ['message_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'message',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message');
    }

}

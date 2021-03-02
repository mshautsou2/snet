import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class topic1614715124668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new Table({
            name: 'topic',
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
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
            ]
        }), true)

        
        await queryRunner.createForeignKey("topic", new TableForeignKey({
            columnNames: ["owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
        }));
                
        await queryRunner.createForeignKey("topic", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('topic')
    }

}

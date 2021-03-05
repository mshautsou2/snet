import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class subtopic1614715131307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new Table({
            name: 'subtopic',
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
                    name: 'topic_id',
                    type: 'uuid',
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
            ]
        }), true)

        
        await queryRunner.createForeignKey("subtopic", new TableForeignKey({
            columnNames: ["owner_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
        }));
                
        await queryRunner.createForeignKey("subtopic", new TableForeignKey({
            columnNames: ["topic_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "topic",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('subtopic')
    }

}

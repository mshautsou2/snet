import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class PermissionMigration1614627318333 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(new Table({
            name: 'permission_copy',
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
                    name: 'key',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: 'role_copy',
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
                    name: 'key',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                }
            ]
        }), true)

        await queryRunner.createTable(new Table({
            name: 'role_permissions_permission_copy',
            columns: [
                {
                    name: 'role_id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'permission_id',
                    type: 'uuid',
                    isPrimary: true,
                }
            ]
        }), true)

        await queryRunner.createForeignKey("role_permissions_permission", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "role",
        }));

        await queryRunner.createForeignKey("role_permissions_permission", new TableForeignKey({
            columnNames: ["permission_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "permission",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('permission_copy')
    }

}

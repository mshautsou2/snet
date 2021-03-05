import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeed1614972398323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertUser(queryRunner, {
      email: 'root@root.com',
      username: 'root',
      password: bcrypt.hashSync('1234', 10), //TODO: MOVE TO ENCRYPTED VARS
    });

    await this.addRole(queryRunner, 'root', 'Root');
  }

  public async down(): Promise<void> {
    //TODO: add rollback migration
  }

  private async insertUser(
    queryRunner: QueryRunner,
    role: { username: string; email: string; password: string },
  ) {
    await queryRunner.query(`
            INSERT INTO "user"(
            id, username, email, password)
            VALUES (uuid_generate_v4(), '${role.username}', '${role.email}', '${role.password}');
        `);
  }

  private async addRole(
    queryRunner: QueryRunner,
    username: string,
    roleKey: string,
  ) {
    await queryRunner.query(`
      INSERT INTO public.user_roles(user_id, role_id)
      VALUES (
              (SELECT id FROM "user" WHERE username = '${username}'),
              (SELECT id FROM "role" WHERE key = '${roleKey}')
             );
  `);
  }
}

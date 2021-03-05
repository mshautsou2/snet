import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialRoles1614966539709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertAnonymousRole(queryRunner);
    await this.insertUserRole(queryRunner);
    await this.insertModeratorRole(queryRunner);
    await this.insertAdminRole(queryRunner);
    await this.insertRootRole(queryRunner);
  }

  public async down(): Promise<void> {
    // TODO: ADD REVERT MIGRATION
  }

  private async insertRootRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Root',
      title: 'Root Role',
      description: 'Сan do anything with anything/anyone',
    });
    //ANONYMOUS
    await this.addRole(queryRunner, 'Root', 'RegisterUser');
    await this.addRole(queryRunner, 'Root', 'ViewCategory');
    await this.addRole(queryRunner, 'Root', 'ViewTopic');
    await this.addRole(queryRunner, 'Root', 'ViewSubtopic');
    await this.addRole(queryRunner, 'Root', 'ViewMessage');
    await this.addRole(queryRunner, 'Root', 'ViewComment');
    //USER
    await this.addRole(queryRunner, 'Root', 'ViewSelfUser');
    await this.addRole(queryRunner, 'Root', 'ViewAnyUser');
    await this.addRole(queryRunner, 'Root', 'EditSelfMessage');
    await this.addRole(queryRunner, 'Root', 'EditSelfComment');
    //MODERATOR
    await this.addRole(queryRunner, 'Root', 'EditAnyComment');
    await this.addRole(queryRunner, 'Root', 'EditAnyMessage');
    //ADMIN
    await this.addRole(queryRunner, 'Root', 'EditSelfCategory');
    await this.addRole(queryRunner, 'Root', 'EditAnyTopic');
    await this.addRole(queryRunner, 'Root', 'EditAnySubtopic');
    //ROOT
    await this.addRole(queryRunner, 'Root', 'ViewPermissions');
    await this.addRole(queryRunner, 'Root', 'EditPermissions');
    await this.addRole(queryRunner, 'Root', 'ViewRoles');
    await this.addRole(queryRunner, 'Root', 'EditRoles');
    await this.addRole(queryRunner, 'Root', 'EditAnyCategory');
  }

  private async insertAdminRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Admin',
      title: 'Admin Role',
      description:
        'Moderator permissions + can create/delete topics, subtopics and categories',
    });
    //ANONYMOUS
    await this.addRole(queryRunner, 'Admin', 'RegisterUser');
    await this.addRole(queryRunner, 'Admin', 'ViewCategory');
    await this.addRole(queryRunner, 'Admin', 'ViewTopic');
    await this.addRole(queryRunner, 'Admin', 'ViewSubtopic');
    await this.addRole(queryRunner, 'Admin', 'ViewMessage');
    await this.addRole(queryRunner, 'Admin', 'ViewComment');
    //USER
    await this.addRole(queryRunner, 'Admin', 'ViewSelfUser');
    await this.addRole(queryRunner, 'Admin', 'ViewAnyUser');
    await this.addRole(queryRunner, 'Admin', 'EditSelfMessage');
    await this.addRole(queryRunner, 'Admin', 'EditSelfComment');
    //MODERATOR
    await this.addRole(queryRunner, 'Admin', 'EditAnyComment');
    await this.addRole(queryRunner, 'Admin', 'EditAnyMessage');
    //ADMIN
    await this.addRole(queryRunner, 'Admin', 'EditSelfCategory');
    await this.addRole(queryRunner, 'Admin', 'EditAnyTopic');
    await this.addRole(queryRunner, 'Admin', 'EditAnySubtopic');
  }

  private async insertModeratorRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Moderator',
      title: 'Default User Role',
      description: 'Can read/leave comments and messages',
    });
    //ANONYMOUS
    await this.addRole(queryRunner, 'Moderator', 'RegisterUser');
    await this.addRole(queryRunner, 'Moderator', 'ViewCategory');
    await this.addRole(queryRunner, 'Moderator', 'ViewTopic');
    await this.addRole(queryRunner, 'Moderator', 'ViewSubtopic');
    await this.addRole(queryRunner, 'Moderator', 'ViewMessage');
    await this.addRole(queryRunner, 'Moderator', 'ViewComment');
    //USER
    await this.addRole(queryRunner, 'Moderator', 'ViewSelfUser');
    await this.addRole(queryRunner, 'Moderator', 'ViewAnyUser');
    await this.addRole(queryRunner, 'Moderator', 'EditSelfMessage');
    await this.addRole(queryRunner, 'Moderator', 'EditSelfComment');
    //MODERATOR
    await this.addRole(queryRunner, 'Moderator', 'EditAnyComment');
    await this.addRole(queryRunner, 'Moderator', 'EditAnyMessage');
  }

  private async insertUserRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'User',
      title: 'Default User Role',
      description: 'Can read/leave comments and messages',
    });
    //ANONYMOUS
    await this.addRole(queryRunner, 'User', 'RegisterUser');
    await this.addRole(queryRunner, 'User', 'ViewCategory');
    await this.addRole(queryRunner, 'User', 'ViewTopic');
    await this.addRole(queryRunner, 'User', 'ViewSubtopic');
    await this.addRole(queryRunner, 'User', 'ViewMessage');
    await this.addRole(queryRunner, 'User', 'ViewComment');
    //USER
    await this.addRole(queryRunner, 'User', 'ViewSelfUser');
    await this.addRole(queryRunner, 'User', 'ViewAnyUser');
    await this.addRole(queryRunner, 'User', 'EditSelfMessage');
    await this.addRole(queryRunner, 'User', 'EditSelfComment');
  }

  private async insertAnonymousRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Anonymous',
      title: 'Anoymous Role',
      description: 'User role when no token provided',
    });
    await this.addRole(queryRunner, 'Anonymous', 'RegisterUser');
    await this.addRole(queryRunner, 'Anonymous', 'ViewCategory');
    await this.addRole(queryRunner, 'Anonymous', 'ViewTopic');
    await this.addRole(queryRunner, 'Anonymous', 'ViewSubtopic');
    await this.addRole(queryRunner, 'Anonymous', 'ViewMessage');
    await this.addRole(queryRunner, 'Anonymous', 'ViewComment');
  }

  private async insertRole(
    queryRunner: QueryRunner,
    role: { key: string; title: string; description: string },
  ) {
    await queryRunner.query(`
            INSERT INTO "role"(
            id, key, title, description)
            VALUES (uuid_generate_v4(), '${role.key}', '${role.title}', '${role.description}');
        `);
  }

  private async addRole(
    queryRunner: QueryRunner,
    permissionKey: string,
    roleKey: string,
  ) {
    await queryRunner.query(`
      INSERT INTO public.role_permissions_permission(role_id, permission_id)
      VALUES (
              (SELECT id FROM "role" WHERE key = '${permissionKey}'),
              (SELECT id FROM "permission" WHERE key = '${roleKey}')
             );
  `);
  }
}

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
    await this.addPermission(queryRunner, 'Root', 'RegisterUser');
    await this.addPermission(queryRunner, 'Root', 'ViewCategory');
    await this.addPermission(queryRunner, 'Root', 'ViewTopic');
    await this.addPermission(queryRunner, 'Root', 'ViewSubtopic');
    await this.addPermission(queryRunner, 'Root', 'ViewMessage');
    await this.addPermission(queryRunner, 'Root', 'ViewComment');
    //USER
    await this.addPermission(queryRunner, 'Root', 'ViewSelfUser');
    await this.addPermission(queryRunner, 'Root', 'ViewAnyUser');
    await this.addPermission(queryRunner, 'Root', 'EditSelfMessage');
    await this.addPermission(queryRunner, 'Root', 'EditSelfComment');
    //MODERATOR
    await this.addPermission(queryRunner, 'Root', 'EditAnyComment');
    await this.addPermission(queryRunner, 'Root', 'EditAnyMessage');
    //ADMIN
    await this.addPermission(queryRunner, 'Root', 'EditSelfCategory');
    await this.addPermission(queryRunner, 'Root', 'EditAnyTopic');
    await this.addPermission(queryRunner, 'Root', 'EditAnySubtopic');
    //ROOT
    await this.addPermission(queryRunner, 'Root', 'ViewPermissions');
    await this.addPermission(queryRunner, 'Root', 'EditPermissions');
    await this.addPermission(queryRunner, 'Root', 'ViewRoles');
    await this.addPermission(queryRunner, 'Root', 'EditRoles');
    await this.addPermission(queryRunner, 'Root', 'EditAnyCategory');
  }

  private async insertAdminRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Admin',
      title: 'Admin Role',
      description:
        'Moderator permissions + can create/delete topics, subtopics and categories',
    });
    //ANONYMOUS
    await this.addPermission(queryRunner, 'Admin', 'RegisterUser');
    await this.addPermission(queryRunner, 'Admin', 'ViewCategory');
    await this.addPermission(queryRunner, 'Admin', 'ViewTopic');
    await this.addPermission(queryRunner, 'Admin', 'ViewSubtopic');
    await this.addPermission(queryRunner, 'Admin', 'ViewMessage');
    await this.addPermission(queryRunner, 'Admin', 'ViewComment');
    //USER
    await this.addPermission(queryRunner, 'Admin', 'ViewSelfUser');
    await this.addPermission(queryRunner, 'Admin', 'ViewAnyUser');
    await this.addPermission(queryRunner, 'Admin', 'EditSelfMessage');
    await this.addPermission(queryRunner, 'Admin', 'EditSelfComment');
    //MODERATOR
    await this.addPermission(queryRunner, 'Admin', 'EditAnyComment');
    await this.addPermission(queryRunner, 'Admin', 'EditAnyMessage');
    //ADMIN
    await this.addPermission(queryRunner, 'Admin', 'EditSelfCategory');
    await this.addPermission(queryRunner, 'Admin', 'EditAnyTopic');
    await this.addPermission(queryRunner, 'Admin', 'EditAnySubtopic');
  }

  private async insertModeratorRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Moderator',
      title: 'Default User Role',
      description: 'Can read/leave comments and messages',
    });
    //ANONYMOUS
    await this.addPermission(queryRunner, 'Moderator', 'RegisterUser');
    await this.addPermission(queryRunner, 'Moderator', 'ViewCategory');
    await this.addPermission(queryRunner, 'Moderator', 'ViewTopic');
    await this.addPermission(queryRunner, 'Moderator', 'ViewSubtopic');
    await this.addPermission(queryRunner, 'Moderator', 'ViewMessage');
    await this.addPermission(queryRunner, 'Moderator', 'ViewComment');
    //USER
    await this.addPermission(queryRunner, 'Moderator', 'ViewSelfUser');
    await this.addPermission(queryRunner, 'Moderator', 'ViewAnyUser');
    await this.addPermission(queryRunner, 'Moderator', 'EditSelfMessage');
    await this.addPermission(queryRunner, 'Moderator', 'EditSelfComment');
    //MODERATOR
    await this.addPermission(queryRunner, 'Moderator', 'EditAnyComment');
    await this.addPermission(queryRunner, 'Moderator', 'EditAnyMessage');
  }

  private async insertUserRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'User',
      title: 'Default User Role',
      description: 'Can read/leave comments and messages',
    });
    //ANONYMOUS
    await this.addPermission(queryRunner, 'User', 'RegisterUser');
    await this.addPermission(queryRunner, 'User', 'ViewCategory');
    await this.addPermission(queryRunner, 'User', 'ViewTopic');
    await this.addPermission(queryRunner, 'User', 'ViewSubtopic');
    await this.addPermission(queryRunner, 'User', 'ViewMessage');
    await this.addPermission(queryRunner, 'User', 'ViewComment');
    //USER
    await this.addPermission(queryRunner, 'User', 'ViewSelfUser');
    await this.addPermission(queryRunner, 'User', 'ViewAnyUser');
    await this.addPermission(queryRunner, 'User', 'EditSelfMessage');
    await this.addPermission(queryRunner, 'User', 'EditSelfComment');
  }

  private async insertAnonymousRole(queryRunner: QueryRunner) {
    await this.insertRole(queryRunner, {
      key: 'Anonymous',
      title: 'Anoymous Role',
      description: 'User role when no token provided',
    });
    await this.addPermission(queryRunner, 'Anonymous', 'RegisterUser');
    await this.addPermission(queryRunner, 'Anonymous', 'ViewCategory');
    await this.addPermission(queryRunner, 'Anonymous', 'ViewTopic');
    await this.addPermission(queryRunner, 'Anonymous', 'ViewSubtopic');
    await this.addPermission(queryRunner, 'Anonymous', 'ViewMessage');
    await this.addPermission(queryRunner, 'Anonymous', 'ViewComment');
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

  private async addPermission(
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

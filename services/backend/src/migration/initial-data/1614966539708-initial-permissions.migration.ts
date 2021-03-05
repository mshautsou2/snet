import { MigrationInterface, QueryRunner } from 'typeorm';

const INITIAL_PERMISSIONS = [
  {
    key: 'RegisterUser',
    title: 'User Registration Permission',
    description: 'Allow user to register',
  },
  {
    key: 'ViewSelfUser',
    title: 'View Own User Info',
    description: 'Allow user to get information about themselfs',
  },
  {
    key: 'ViewAnyUser',
    title: 'View Any User Info',
    description: 'Allow user to get information about any user',
  },
  {
    key: 'EditAnyUser',
    title: 'Edit Any User',
    description: 'Allow user to edit information about any user',
  },
  {
    key: 'EditSelfUser',
    title: 'Edit Own User Info',
    description: 'Allow user to edit information about themselfs',
  },
  {
    key: 'EditAnyCategory',
    title: 'Edit Any Category Info',
    description: 'Allow user to edit information about category',
  },
  {
    key: 'EditSelfCategory',
    title: 'Edit Own Category Info',
    description: 'Allow user to edit information about own category',
  },
  {
    key: 'ViewCategory',
    title: 'View Any Category Info',
    description: 'Allow user to view information about any category',
  },
  {
    key: 'EditAnyTopic',
    title: 'Edit Any Topic Info',
    description: 'Allow user to edit information about topic',
  },
  {
    key: 'EditSelfTopic',
    title: 'Edit Own Topic Info',
    description: 'Allow user to edit information about own topic',
  },
  {
    key: 'ViewTopic',
    title: 'View Any Category Info',
    description: 'Allow user to view information about any topic',
  },

  {
    key: 'EditAnySubtopic',
    title: 'Edit Any Subtopic Info',
    description: 'Allow user to edit information about Subtopic',
  },
  {
    key: 'EditSelfSubtopic',
    title: 'Edit Own Subtopic Info',
    description: 'Allow user to edit information about own Subtopic',
  },
  {
    key: 'ViewSubtopic',
    title: 'View Any Subtopic Info',
    description: 'Allow user to view information about any Subtopic',
  },

  {
    key: 'EditAnyMessage',
    title: 'Edit Any Message Info',
    description: 'Allow user to edit information about message',
  },
  {
    key: 'EditSelfMessage',
    title: 'Edit Own Message Info',
    description: 'Allow user to edit information about own message',
  },
  {
    key: 'ViewMessage',
    title: 'View Any Message Info',
    description: 'Allow user to view information about any message',
  },

  {
    key: 'EditAnyComment',
    title: 'Edit Any Comment Info',
    description: 'Allow user to edit information about comment',
  },
  {
    key: 'EditSelfComment',
    title: 'Edit Own Comment Info',
    description: 'Allow user to edit information about own comment',
  },
  {
    key: 'ViewComment',
    title: 'View Any Comment Info',
    description: 'Allow user to view information about any comment',
  },

  {
    key: 'EditPermissions',
    title: 'Edit Permissions Info',
    description: 'Allow user to edit information about any permission',
  },
  {
    key: 'ViewPermissions',
    title: 'View Permissions Info',
    description: 'Allow user to view information about any permission',
  },

  {
    key: 'EditRoles',
    title: 'Edit Roles Info',
    description:
      'Allow user to perform such operation as creation/edition of infomration/deletion of roles',
  },
  {
    key: 'ViewRoles',
    title: 'View Roles Info',
    description: 'Allow user to view information about any role',
  },
];
export class InitialPermissions1614966539708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const permission of INITIAL_PERMISSIONS) {
      await queryRunner.query(`
            INSERT INTO public.permission(
            id, key, title, description)
            VALUES (uuid_generate_v4(), '${permission.key}', '${permission.title}', '${permission.description}');
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM public.permission
        WHERE key IN (${INITIAL_PERMISSIONS.map((p) => `'${p.key}'`).join(
          ', ',
        )});
      `);
  }
}

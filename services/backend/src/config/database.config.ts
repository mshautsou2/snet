import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/entity/**/*.js'],

    synchronize: true,
    migrationsTableName: 'migration',

    migrations: ['src/migration/*.ts'],

    cli: {
      migrationsDir: 'src/migration',
    },

    autoLoadEntities: true,
    ssl: false, // FIXME: retrieve value from env var
  }),
);

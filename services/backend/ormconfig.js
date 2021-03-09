module.exports = [
  {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    migrations: ['src/migration/**/*.ts'],
    cli: {
      migrationDir: 'migration',
    },
  },
  {
    name: 'seed',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    migrations: ['src/seeds/**/*.ts'],
    cli: {
      migrationDir: 'seeds',
    },
  },
];

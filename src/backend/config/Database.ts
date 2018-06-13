module.exports = [{
  type: 'postgres',
  name: 'default',

  entities: [
    (process.env.NODE_ENV !== 'local') ? 'compiled/models/*.js' : 'models/*.ts'
  ],
  migrations: [
    (process.env.NODE_ENV !== 'local') ? 'compiled/migrations/*.js' : 'migrations/*.ts'
  ],

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  logging: [`error`],

  cli: {
    entitiesDir: 'models',
    migrationsDir: 'migrations',
  }
}];

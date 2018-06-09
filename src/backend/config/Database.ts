import { ConnectionOptions } from 'typeorm';

export default [{
  type: 'postgres',

  entities: [
    (process.env.NODE_ENV !== 'local') ? 'compiled/models/*.js' : 'models/*.ts'
  ],

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  logging: [`error`],
}] as [ConnectionOptions];

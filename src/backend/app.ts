import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { createConnection } from 'typeorm';
import { default as connectionOptions } from './config/Database';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

createConnection(connectionOptions[0])
  .then(() => server.listen(process.env.PORT || 3000))
  .then(() => {
    console.info(`Server Started on ${process.env.PORT || 3000}`);
  })
  .catch(err => {
    console.error(`Unable to start Server:`, err);
  });

process.on('uncaughtException', err => {
  console.error('uncaughtException', err);
});

process.on('unhandledRejection', err => {
  console.error('unhandledRejection', err);
});

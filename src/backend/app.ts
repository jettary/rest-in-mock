import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.info(`Server Started on ${process.env.PORT || 3000}`);
});

process.on('uncaughtException', err => {
    console.error('uncaughtException', err);
});

process.on('unhandledRejection', err => {
    console.error('unhandledRejection', err);
});

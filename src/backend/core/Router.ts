import * as _ from 'lodash';
import { Express, Router } from 'express';
import * as controllers from '../controllers';

export const Mount = (app: Express) => {
  const router = Router();

  _.forEach(controllers, controllerClass => {
    router.get(controllerClass.base, (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      instance.list();
    });

    router.post(controllerClass.base, (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      instance.create();
    });

    router.get(`${controllerClass.base}/:id(\\d+)`, (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      instance.index(id);
    });

    router.put(`${controllerClass.base}/:id(\\d+)`, (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      instance.update(id);
    });

    router.delete(`${controllerClass.base}/:id(\\d+)`, (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      instance.remove(id);
    });

  });

  app.use(router);
};

import * as _ from 'lodash';
import { Express, Router } from 'express';
import { GeneralException } from './Exceptions';
import { BaseController } from './Controller';
import { isClassOf } from './helpers';
import * as controllers from '../controllers';

export const Mount = (app: Express) => {
  const router = Router();

  _.forIn(controllers, controllerClass => {
    if (!isClassOf(controllerClass, BaseController)) {
      return;
    }

    router.get(controllerClass.base, async (req, res, next) => {
      const instance = new controllerClass(req, res, next);

      try {
        await instance.list();
      } catch (e) {
        res.status(500).json(new GeneralException(
          'WTF_HAPPEND',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    });

    router.post(controllerClass.base, async (req, res, next) => {
      const instance = new controllerClass(req, res, next);

      try {
        await instance.create();
      } catch (e) {
        res.status(500).json(new GeneralException(
          'WTF_HAPPEND',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    });

    router.get(`${controllerClass.base}/:id(\\d+)`, async (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      try {
        await instance.index(id);
      } catch (e) {
        res.status(500).json(new GeneralException(
          'WTF_HAPPEND',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    });

    router.put(`${controllerClass.base}/:id(\\d+)`, async (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      try {
        await instance.update(id);
      } catch (e) {
        res.status(500).json(new GeneralException(
          'WTF_HAPPENED',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    });

    router.delete(`${controllerClass.base}/:id(\\d+)`, async (req, res, next) => {
      const instance = new controllerClass(req, res, next);
      const id = parseInt(req.params.id, 10);

      try {
        await instance.remove(id);
      } catch (e) {
        res.status(500).json(new GeneralException(
          'WTF_HAPPEND',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    });

  });

  app.use(router);
};

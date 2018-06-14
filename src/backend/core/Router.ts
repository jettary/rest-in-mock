import * as _ from 'lodash';
import { Express, NextFunction, Request, Response, Router } from 'express';
import { GeneralException } from './Exceptions';
import { BaseController } from './Controller';
import { isClassOf } from './helpers';
import { RouterAction } from './Iterfaces';
import * as controllers from '../controllers';

export const Mount = (app: Express) => {
  const router = Router();

  _.forIn(controllers, controllerClass => {
    if (!isClassOf(controllerClass, BaseController)) {
      return;
    }

    router.get(controllerClass.base, makeHandler('list', controllerClass));
    router.post(controllerClass.base, makeHandler('create', controllerClass));
    router.get(`${controllerClass.base}/:id(\\d+)`, makeHandler('index', controllerClass));
    router.put(`${controllerClass.base}/:id(\\d+)`, makeHandler('update', controllerClass));
    router.delete(`${controllerClass.base}/:id(\\d+)`, makeHandler('remove', controllerClass));
  });

  app.use(router);
};

function makeHandler(action: RouterAction, controllerKlass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = new controllerKlass(req, res, next);
    const args = _.values(req.params);

    try {
      await instance[action](...args);
    } catch (e) {
      if (e instanceof GeneralException) {
        return res.status(400).json(e);
      } else {
        return res.status(500).json(new GeneralException(
          'WTF_HAPPEND',
          'Something went wrong',
          { originalMessage: e.message }
        ));
      }
    }
  };
}

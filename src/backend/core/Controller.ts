import * as _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { GeneralException } from './Exceptions';
import { ControllerInterface } from './Iterfaces';

export class BaseController implements ControllerInterface {

  public static base: string = '';

  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    [ this.req, this.res, this.next ] = [req, res, next];
  }

  public async list(...args) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async index(id: number, ...args) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async create(...args) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async update(id: number, ...args) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async remove(id: number, ...args) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public getModelPayload(model: any, exceptof: string[] = ['id', 'createdAt', 'updatedAt']) {
    const modelFields = getConnection()
      .getMetadata(model).columns
      .map(col => col.propertyName);

    return _(this.req.body).pick(modelFields).omit(exceptof).value();
  }
}

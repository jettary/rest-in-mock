import { NextFunction, Request, Response } from 'express';
import { GeneralException } from './Exceptions';

export interface ControllerInterface {
  base?: string;

  list(): Promise<any>;
  index(id: number): Promise<any>;
  create(): Promise<any>;
  update(id: number): Promise<any>;
  remove(id: number): Promise<any>;
}

export class BaseController implements ControllerInterface {

  public static base: string = '';

  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    [ this.req, this.res, this.next ] = [req, res, next];
  }

  public async list() {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async index(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async create() {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async update(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public async remove(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }
}

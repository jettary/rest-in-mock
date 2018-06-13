import { NextFunction, Request, Response } from 'express';
import { GeneralException } from './Exceptions';

export class BaseController {

  public static base: string = '';

  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    [ this.req, this.res, this.next ] = [req, res, next];
  }

  public list() {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public index(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public create() {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public update(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }

  public remove(id: number) {
    return this.res.status(501).json(new GeneralException('NOT_IMPLEMENTED', 'Not Implemented'));
  }
}

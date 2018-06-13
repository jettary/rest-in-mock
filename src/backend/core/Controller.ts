import { NextFunction, Request, Response } from 'express';

export class BaseController {

  public static base: string = '/api';

  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    [ this.req, this.res, this.next ] = [req, res, next];
  }

  public list() {
    return this.res.json({ items: [], total: 0 });
  }

  public index(id: number) {
    return this.res.json({ item: { id } });
  }

  public create() {
    return this.index(0);
  }

  public update(id: number) {
    return this.index(0);
  }

  public remove(id: number) {
    return this.res.json({ message: 'OK' });
  }
}

import { BaseController } from '../core/Controller';

export class CollectionController extends BaseController {

  public static base: string = '/api/collections';

  constructor(req, res, next) {
    super(req, res, next);
  }

}

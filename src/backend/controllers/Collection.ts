import { BaseController } from '../core/Controller';
import { getRepository, Repository } from 'typeorm';
import { applyRequest } from '../core/helpers';
import { Collection } from '../models/Collection';
import { ControllerInterface } from '../core/Iterfaces';
import {GeneralException} from "../core/Exceptions";

export class CollectionController extends BaseController implements ControllerInterface {

  public static base: string = '/api/collections';

   public repository: Repository<Collection>;

  constructor(req, res, next) {
    super(req, res, next);

    this.repository = getRepository(Collection);
  }

  public async list() {
    const qb = this.repository.createQueryBuilder('collection');
    applyRequest(qb, Collection, this.req);

    const [items, total] = await qb.getManyAndCount();

    return this.res.json({ total, items });
  }

  public async create() {
    const instance = this.repository.create(this.getModelPayload(Collection));
    const errors = instance.validate();

    if (errors.length) {
      return this.res.status(400).json(new GeneralException('INVALID_REQUEST', 'Invalid request'));
    }

    console.log(instance)
    await this.repository.save(instance);

    return this.res.json({ collection: instance });
  }

}

import { BaseController } from '../core/Controller';
import { getRepository, Repository } from 'typeorm';
import { applyRequest } from '../core/helpers';
import { Collection } from '../models/Collection';
import { ControllerInterface } from '../core/Iterfaces';
import { InvalidRequest, NotFound } from '../core/Exceptions';

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
      return this.res.status(400).json(new InvalidRequest(errors));
    }

    await this.repository.save(instance);

    return this.index(instance.id);
  }

  public async index(id: number) {
    const collection = await this.repository.findOne({ id });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    return this.res.json({ collection });
  }

  public async update(id: number) {
    const collection = await this.repository.findOne({ id });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    Object.assign(collection, this.getModelPayload(Collection));

    const errors = collection.validate();
    if (errors.length) {
      return this.res.status(400).json(new InvalidRequest(errors));
    }

    await this.repository.save(collection);

    return this.index(collection.id);
  }

  public async remove(id: number) {
    const collection = await this.repository.findOne({ id });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    await this.repository.remove(collection);

    return this.res.json({ message: 'Job is done'});
  }

}

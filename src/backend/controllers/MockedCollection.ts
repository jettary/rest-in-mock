import { BaseController } from '../core/Controller';
import { getRepository, Repository } from 'typeorm';
import { Collection } from '../models/Collection';
import { InvalidRequest, NotFound } from '../core/Exceptions';
import { ControllerInterface } from '../core/Iterfaces';

export class MockedCollectionController extends BaseController implements ControllerInterface {

  public static base: string = '/mocks/:collection([a-z][a-z\\-]+?\\b)';

  public repository: Repository<Collection>;

  constructor(req, res, next) {
    super(req, res, next);

    this.repository = getRepository(Collection);
  }

  public async list(collectionName: string) {
    const collection = await this.repository.findOne({ name: collectionName });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${collectionName} not found`));
    }

    // TODO: add generator

    return this.res.json({ total: Math.floor(Math.random() * 100), items: [/* generated collection */] });
  }

  public async index(id: number, collectionName: string) {
    const collection = await this.repository.findOne({ name: collectionName });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${collectionName} not found`));
    }

    if (id === 404) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    // TODO: add generator

    return this.res.json({ [collectionName]: collection.model });
  }

  public async create(collectionName: string) {
    const collection = await this.repository.findOne({ name: collectionName });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${collectionName} not found`));
    }

    // TODO: validate payload

    return this.index(Math.floor(Math.random() * 100), collectionName);
  }

  public async update(id: number, collectionName: string) {
    const collection = await this.repository.findOne({ name: collectionName });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${collectionName} not found`));
    }

    if (id === 404) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    // TODO: validate payload

    return this.index(Math.floor(Math.random() * 100), collectionName);
  }

  public async remove(id: number, collectionName: string) {
    const collection = await this.repository.findOne({ name: collectionName });

    if (!collection) {
      return this.res.status(404).json(new NotFound(`Collection #${collectionName} not found`));
    }

    if (id === 404) {
      return this.res.status(404).json(new NotFound(`Collection #${id} not found`));
    }

    return this.res.json({ message: 'Job is done'});
  }

}

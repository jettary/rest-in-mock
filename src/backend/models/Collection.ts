import * as _ from 'lodash';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityInterface, ModelError, ModelFieldError } from '../core/Iterfaces';

@Entity()
export class Collection implements EntityInterface {

  public static orderBys = ['-updatedAt', 'name', 'createdAt'];
  public static fallbackOrderBys = ['id'];

  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text', nullable: false })
  public name: string;

  @Column({ type: 'jsonb', default: '{}' })
  public model: object = {};

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public validate(): ModelError[] {
    const errors: { [key: string]: ModelFieldError[] } = {
      name: [],
      model: [],
    };

    /*
    * `name` validation
    * */
    if (!this.name) {
      errors.name.push({
        constraint: 'required',
        message: 'Field "name" required'
      });
    }

    if (_.isString(this.name))  {
      // `name` will be used as part of route, so only a-z and hypen allowed
      if (!/^[a-z]{1}[a-z\-]+?[a-z]{1}$/.test(this.name)) {
        errors.name.push({
          constraint: 'invalid',
          message: `Field "name" should consist of lower alphabetical chars and hypen only`
        });
      }

      // validate length
      if (this.name.length < 4 || this.name.length > 32) {
        errors.name.push({
          constraint: 'length',
          message: `Field "name" should be at least 4 and no more 32 chars longs`
        });
      }
    } else {
      errors.name.push({
        constraint: 'invalid',
        message: `Field "name" should be string [4, 32] chars longs`
      });
    }

    return _.map(_.keys(errors), field => {
      if (errors[field].length) {
        return { field, errors: errors[field] };
      }
      return null;
    }).filter(err => err !== null);
  }
}

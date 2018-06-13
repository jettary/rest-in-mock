import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EntityInterface } from '../core/Iterfaces';

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

  public validate(): string[] {
    return [];
  }
}
